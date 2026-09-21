import type { CardAudioMap, CardAudioMeta } from '../types';

/**
 * Custom clips live in IndexedDB: localStorage only takes strings and a handful
 * of megabytes, and the clips have to survive offline like the rest of the PWA.
 *
 * Metadata and audio sit in separate stores on purpose — the sheet lists all 55
 * entries on open, and that listing must not pull any audio into memory.
 */
const DB_NAME = 'loteria-cantor-audio';
const DB_VERSION = 1;
const META_STORE = 'clips';
const BLOB_STORE = 'blobs';

export function audioStorageSupported(): boolean {
  try {
    return typeof indexedDB !== 'undefined';
  } catch {
    return false;
  }
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(META_STORE)) db.createObjectStore(META_STORE, { keyPath: 'key' });
      if (!db.objectStoreNames.contains(BLOB_STORE)) db.createObjectStore(BLOB_STORE);
    };

    request.onsuccess = () => {
      const db = request.result;
      // A newer tab upgrading the schema closes this handle; drop the cache so
      // the next call reopens instead of using a dead connection.
      db.onclose = () => { dbPromise = null; };
      db.onversionchange = () => { db.close(); dbPromise = null; };
      resolve(db);
    };

    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('IndexedDB upgrade blocked by another tab'));
  }).catch(err => {
    dbPromise = null;
    throw err;
  });

  return dbPromise;
}

function runTx<T>(
  storeNames: string[],
  mode: IDBTransactionMode,
  run: (tx: IDBTransaction) => IDBRequest<T> | null
): Promise<T | null> {
  return openDb().then(
    db =>
      new Promise<T | null>((resolve, reject) => {
        const tx = db.transaction(storeNames, mode);
        const request = run(tx);
        let result: T | null = null;
        if (request) request.onsuccess = () => { result = request.result; };
        tx.oncomplete = () => resolve(result);
        tx.onabort = () => reject(tx.error);
        tx.onerror = () => reject(tx.error);
      })
  );
}

export async function loadAllMeta(): Promise<CardAudioMap> {
  const all = await runTx<CardAudioMeta[]>([META_STORE], 'readonly', tx =>
    tx.objectStore(META_STORE).getAll() as IDBRequest<CardAudioMeta[]>
  );

  const map: CardAudioMap = {};
  for (const meta of all ?? []) {
    if (meta && typeof meta.key === 'number') map[meta.key] = meta;
  }
  return map;
}

export async function loadClipBlob(key: number): Promise<Blob | null> {
  const blob = await runTx<Blob>([BLOB_STORE], 'readonly', tx =>
    tx.objectStore(BLOB_STORE).get(key) as IDBRequest<Blob>
  );
  return blob ?? null;
}

export async function saveClip(meta: CardAudioMeta, blob: Blob): Promise<void> {
  await runTx([META_STORE, BLOB_STORE], 'readwrite', tx => {
    tx.objectStore(META_STORE).put(meta);
    tx.objectStore(BLOB_STORE).put(blob, meta.key);
    return null;
  });
}

export async function deleteClip(key: number): Promise<void> {
  await runTx([META_STORE, BLOB_STORE], 'readwrite', tx => {
    tx.objectStore(META_STORE).delete(key);
    tx.objectStore(BLOB_STORE).delete(key);
    return null;
  });
}

export async function clearClips(): Promise<void> {
  await runTx([META_STORE, BLOB_STORE], 'readwrite', tx => {
    tx.objectStore(META_STORE).clear();
    tx.objectStore(BLOB_STORE).clear();
    return null;
  });
}
