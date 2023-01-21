import { Event } from "eventery";

const callbacks = new WeakMap<any, Event<any>>();

export function onUpdate<T>(subject: T) {
  let event = callbacks.get(subject);

  if (!event) {
    event = new Event();
    callbacks.set(subject, event);
  }

  return event;
}

export function update<T>(store: T, mutator?: (store: T) => void) {
  /* Execute mutator if one is given */
  mutator?.(store);

  /* Emit update event if one exists */
  callbacks.get(store)?.emit(store);
}
