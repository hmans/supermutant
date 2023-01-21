import { Event } from "eventery";

const callbacks = new WeakMap<any, Event<any>>();

export function onUpdated<T>(store: T, callback: (store: T) => void) {
  if (!callbacks.has(store)) {
    callbacks.set(store, new Event());
  }

  const event = callbacks.get(store)!;
  event.subscribe(callback);
  return () => event.unsubscribe(callback);
}

export function update<T>(store: T, callback?: (store: T) => void) {
  if (callback) {
    callback(store);
  }

  if (callbacks.has(store)) {
    callbacks.get(store)!.emit(store);
  }
}
