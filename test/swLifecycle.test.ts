import assert from 'node:assert/strict';
import test from 'node:test';

import {
  findFreshServiceWorker,
  waitForServiceWorkerActivation,
  type RegistrationLike,
  type WorkerLike,
} from '../src/lib/swLifecycle.ts';

class FakeWorker implements WorkerLike {
  state: ServiceWorkerState;
  private listeners: Array<() => void> = [];

  constructor(state: ServiceWorkerState = 'installing') {
    this.state = state;
  }

  addEventListener(_type: 'statechange', listener: () => void): void {
    this.listeners.push(listener);
  }

  removeEventListener(_type: 'statechange', listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  setState(state: ServiceWorkerState): void {
    this.state = state;
    for (const listener of [...this.listeners]) listener();
  }
}

class FakeRegistration implements RegistrationLike {
  installing: WorkerLike | null = null;
  waiting: WorkerLike | null = null;
  onUpdate: () => Promise<unknown> = async () => undefined;
  private listeners: Array<() => void> = [];

  update(): Promise<unknown> {
    return this.onUpdate();
  }

  addEventListener(_type: 'updatefound', listener: () => void): void {
    this.listeners.push(listener);
  }

  removeEventListener(_type: 'updatefound', listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  emitUpdateFound(): void {
    for (const listener of [...this.listeners]) listener();
  }
}

test('waitForServiceWorkerActivation resolves true immediately for an activated worker', async () => {
  assert.equal(await waitForServiceWorkerActivation(new FakeWorker('activated'), 1000), true);
});

test('waitForServiceWorkerActivation resolves true when the worker activates', async () => {
  const worker = new FakeWorker('installing');
  const wait = waitForServiceWorkerActivation(worker, 5000);
  worker.setState('installed');
  worker.setState('activating');
  worker.setState('activated');
  assert.equal(await wait, true);
});

test('waitForServiceWorkerActivation handles a worker starting in the waiting state', async () => {
  const worker = new FakeWorker('installed');
  const wait = waitForServiceWorkerActivation(worker, 5000);
  worker.setState('activating');
  worker.setState('activated');
  assert.equal(await wait, true);
});

test('waitForServiceWorkerActivation resolves true when the install fails (redundant)', async () => {
  const worker = new FakeWorker('installing');
  const wait = waitForServiceWorkerActivation(worker, 5000);
  worker.setState('redundant');
  assert.equal(await wait, true);
});

test('waitForServiceWorkerActivation resolves false after the timeout for a stuck worker', async () => {
  assert.equal(await waitForServiceWorkerActivation(new FakeWorker('installing'), 20), false);
});

test('findFreshServiceWorker returns a worker already mid-install without checking again', async () => {
  const reg = new FakeRegistration();
  const inFlight = new FakeWorker('installing');
  reg.installing = inFlight;
  let updateCalled = false;
  reg.onUpdate = async () => {
    updateCalled = true;
  };

  assert.equal(await findFreshServiceWorker(reg, 50), inFlight);
  assert.equal(updateCalled, false);
});

test('findFreshServiceWorker returns a worker already waiting without checking again', async () => {
  const reg = new FakeRegistration();
  const waiting = new FakeWorker('installed');
  reg.waiting = waiting;
  let updateCalled = false;
  reg.onUpdate = async () => {
    updateCalled = true;
  };

  assert.equal(await findFreshServiceWorker(reg, 50), waiting);
  assert.equal(updateCalled, false);
});

test('findFreshServiceWorker returns the worker found by update()', async () => {
  const reg = new FakeRegistration();
  const fresh = new FakeWorker('installing');
  reg.onUpdate = async () => {
    reg.installing = fresh;
  };

  assert.equal(await findFreshServiceWorker(reg, 50), fresh);
});

test('findFreshServiceWorker returns a worker that reached waiting during update()', async () => {
  const reg = new FakeRegistration();
  const waiting = new FakeWorker('installed');
  reg.onUpdate = async () => {
    reg.waiting = waiting;
  };

  assert.equal(await findFreshServiceWorker(reg, 50), waiting);
});

test('findFreshServiceWorker waits for a late updatefound event', async () => {
  const reg = new FakeRegistration();
  const fresh = new FakeWorker('installing');
  reg.onUpdate = async () => {
    setTimeout(() => {
      reg.installing = fresh;
      reg.emitUpdateFound();
    }, 10);
  };

  assert.equal(await findFreshServiceWorker(reg, 5000), fresh);
});

test('findFreshServiceWorker falls back to a waiting worker after a late updatefound', async () => {
  const reg = new FakeRegistration();
  const waiting = new FakeWorker('installed');
  reg.onUpdate = async () => {
    setTimeout(() => {
      reg.waiting = waiting;
      reg.emitUpdateFound();
    }, 10);
  };

  assert.equal(await findFreshServiceWorker(reg, 5000), waiting);
});

test('findFreshServiceWorker returns null when no update exists', async () => {
  assert.equal(await findFreshServiceWorker(new FakeRegistration(), 20), null);
});

test('findFreshServiceWorker returns null when the update check fails', async () => {
  const reg = new FakeRegistration();
  reg.onUpdate = async () => {
    throw new Error('offline');
  };

  assert.equal(await findFreshServiceWorker(reg, 5000), null);
});
