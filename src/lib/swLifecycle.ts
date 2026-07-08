/** The slice of ServiceWorker the update flow needs (injectable in tests). */
export interface WorkerLike {
  readonly state: ServiceWorkerState;
  addEventListener(type: 'statechange', listener: () => void): void;
  removeEventListener(type: 'statechange', listener: () => void): void;
}

/** The slice of ServiceWorkerRegistration the update flow needs. */
export interface RegistrationLike {
  readonly installing: WorkerLike | null;
  readonly waiting: WorkerLike | null;
  update(): Promise<unknown>;
  addEventListener(type: 'updatefound', listener: () => void): void;
  removeEventListener(type: 'updatefound', listener: () => void): void;
}

const SETTLED_STATES: ReadonlyArray<ServiceWorkerState> = ['activated', 'redundant'];

/**
 * Resolves with true once the worker has activated (or become redundant after
 * a failed install), or with false after `timeoutMs`. Never rejects.
 */
export function waitForServiceWorkerActivation(worker: WorkerLike, timeoutMs: number): Promise<boolean> {
  return new Promise(resolve => {
    if (SETTLED_STATES.includes(worker.state)) {
      resolve(true);
      return;
    }
    const finish = (settled: boolean) => {
      clearTimeout(timer);
      worker.removeEventListener('statechange', onStateChange);
      resolve(settled);
    };
    const onStateChange = () => {
      if (SETTLED_STATES.includes(worker.state)) finish(true);
    };
    const timer = setTimeout(() => finish(false), timeoutMs);
    worker.addEventListener('statechange', onStateChange);
  });
}

/**
 * Checks the server for a newer service worker and returns it, or null when
 * the app is already on the latest version (or the check failed, e.g. offline).
 */
export async function findFreshServiceWorker(
  reg: RegistrationLike,
  updateFoundGraceMs: number
): Promise<WorkerLike | null> {
  // An update may already be mid-install from the browser's own check.
  const inFlight = reg.installing ?? reg.waiting;
  if (inFlight) return inFlight;

  try {
    await reg.update();
  } catch {
    return null;
  }

  const found = reg.installing ?? reg.waiting;
  if (found) return found;

  // Some browsers resolve update() before `installing` is populated; give
  // `updatefound` a short grace period before concluding we're up to date.
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      reg.removeEventListener('updatefound', onUpdateFound);
      resolve(reg.installing ?? reg.waiting);
    }, updateFoundGraceMs);
    const onUpdateFound = () => {
      clearTimeout(timer);
      reg.removeEventListener('updatefound', onUpdateFound);
      resolve(reg.installing ?? reg.waiting);
    };
    reg.addEventListener('updatefound', onUpdateFound);
  });
}
