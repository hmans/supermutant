import { Event } from "eventery";

const callbacks = new WeakMap<any, Event<any>>();

export function onMutate<T>(subject: T) {
  let event = callbacks.get(subject);

  if (!event) {
    event = new Event();
    callbacks.set(subject, event);
  }

  return event;
}

export function mutate<T>(subject: T, mutator?: (store: T) => void) {
  /* Execute mutator if one is given */
  mutator?.(subject);

  /* Emit update event if one exists */
  callbacks.get(subject)?.emit(subject);
}
