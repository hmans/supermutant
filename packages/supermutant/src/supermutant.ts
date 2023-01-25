import { Event } from "eventery";

/**
 * In Supermutant, any object can be a subject.
 */
export type Subject = any;

/**
 * A map of subjects to their update events.
 */
const callbacks = new WeakMap<Subject, Event<[subject: Subject]>>();

/**
 * Returns an event that emits when the given subject is updated
 * through the `mutate` function.
 *
 * @param subject The subject to return the update event for.
 * @returns An event that emits when the subject is updated.
 */
export function mutationEvent<T extends Subject>(subject: T) {
  let event = callbacks.get(subject);

  if (!event) {
    event = new Event();
    callbacks.set(subject, event);
  }

  return event;
}

/**
 * Subscribes to updates on the given subject. Will execute the given callback
 * every time the subject is updated through the `mutate` function. Optionally,
 * a selector function can be provided that selects a value from the subject. The
 * callback will only be executed when the selected value changes.
 *
 * @param subject The subject to subscribe to.
 * @param callback The callback to execute when the subject is updated.
 * @param selector An optional function that selects a value from the subject. The callback will only be executed when the selected value changes.
 * @returns A function that will unsubscribe the listener.
 */
export function onMutate<T extends Subject>(
  subject: T,
  callback: (subject: T) => void,
  selector?: (subject: T) => any
) {
  if (selector) {
    let previousValue = selector(subject);

    return mutationEvent(subject).subscribe((subject) => {
      const currentValue = selector(subject);

      if (currentValue !== previousValue) {
        previousValue = currentValue;
        callback(subject);
      }
    });
  } else {
    return mutationEvent(subject).subscribe(callback);
  }
}

/**
 * Updates the given subject. A mutater function can be provided that will be
 * executed before the update event is emitted, but this is purely cosmetic.
 * Most importantly, all subscribers to the subject's update event will be
 * notified of the update.
 *
 * @param subject The subject to update.
 * @param mutator An optional function that mutates the subject.
 */
export function mutate<T extends Subject>(
  subject: T,
  mutator?: (store: T) => void
) {
  /* Execute mutator if one is given */
  mutator?.(subject);

  /* Emit update event if one exists */
  callbacks.get(subject)?.emit(subject);
}
