import { Event } from "eventery";

const callbacks = new WeakMap<any, Event<any>>();

const subjects = new WeakSet<any>();

export function supermutant<T>(subject: T) {
  subjects.add(subject);
  return subject;
}

function assertSupermutated<T>(subject: T) {
  if (!subjects.has(subject)) {
    throw new Error("Subject is not supermutated");
  }
}

export function onUpdate<T>(subject: T) {
  assertSupermutated(subject);

  let event = callbacks.get(subject);

  if (!event) {
    event = new Event();
    callbacks.set(subject, event);
  }

  return event;
}

export function update<T>(subject: T, mutator?: (store: T) => void) {
  assertSupermutated(subject);

  /* Execute mutator if one is given */
  mutator?.(subject);

  /* Emit update event if one exists */
  callbacks.get(subject)?.emit(subject);
}
