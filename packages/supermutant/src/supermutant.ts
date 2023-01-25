import { Event } from "eventery";

export type Subject = any;

const callbacks = new WeakMap<Subject, Event<[subject: Subject]>>();

export function mutationEvent<T extends Subject>(subject: T) {
  let event = callbacks.get(subject);

  if (!event) {
    event = new Event();
    callbacks.set(subject, event);
  }

  return event;
}

export function onMutate<T extends Subject>(
  subject: T,
  callback: (subject: T) => any
) {
  return mutationEvent(subject).subscribe(callback);
}

export function onMutateSelector<T extends Subject>(
  subject: T,
  selector: (subject: T) => void,
  callback: (subject: T) => void
) {
  let previousValue = selector(subject);

  return onMutate(subject, (subject) => {
    const currentValue = selector(subject);

    if (currentValue !== previousValue) {
      previousValue = currentValue;
      callback(subject);
    }
  });
}

export function mutate<T extends Subject>(
  subject: T,
  mutator?: (store: T) => void
) {
  /* Execute mutator if one is given */
  mutator?.(subject);

  /* Emit update event if one exists */
  callbacks.get(subject)?.emit(subject);
}
