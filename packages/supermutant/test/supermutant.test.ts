import {
  onMutate,
  mutate,
  mutationEvent,
  onMutateSelector,
} from "../src/supermutant";
import { Event } from "eventery";

describe(mutationEvent, () => {
  it("returns an event object representing updates to the given subject", () => {
    const subject = {};
    const event = mutationEvent(subject);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(Event);
  });

  it("gets emitted when an update is performed on the subject", () => {
    const subject = {};

    const listener = jest.fn();
    mutationEvent(subject).subscribe(listener);

    mutate(subject);
    expect(listener).toHaveBeenCalled();
  });
});

describe(onMutate, () => {
  it("subscribes to updates on the given subject", () => {
    const subject = {};

    const listener = jest.fn();
    onMutate(subject, listener);

    mutate(subject);
    expect(listener).toHaveBeenCalled();
  });

  it("returns a function that unsubscribes the listener", () => {
    const subject = {};

    const listener = jest.fn();
    const unsubscribe = onMutate(subject, listener);

    unsubscribe();
    mutate(subject);
    expect(listener).not.toHaveBeenCalled();
  });
});

describe(mutate, () => {
  it("notifies any subscribers about a mutation", () => {
    const subject = {};

    const listener = jest.fn();
    onMutate(subject, listener);

    mutate(subject);
    expect(listener).toHaveBeenCalled();
  });

  it("it executes the mutator callback if one is given", () => {
    const subject = { count: 0 };

    mutate(subject, (subject) => {
      subject.count++;
    });

    expect(subject.count).toBe(1);
  });
});

describe(onMutateSelector, () => {
  it("executes the listener when the subject's selected value changes", () => {
    const subject = { count: 0, name: "Alice" };

    const listener = jest.fn();
    onMutateSelector(subject, (subject) => subject.count, listener);

    mutate(subject, (subject) => {
      subject.count++;
    });

    expect(listener).toHaveBeenCalled();

    mutate(subject, (subject) => {
      subject.name = "Bob";
    });

    expect(listener).toHaveBeenCalledTimes(1);

    mutate(subject, (subject) => {
      subject.count++;
    });

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("returns a function that will unsubscribe the listener", () => {
    const subject = { count: 0, name: "Alice" };

    const listener = jest.fn();
    const unsubscribe = onMutateSelector(
      subject,
      (subject) => subject.count,
      listener
    );

    unsubscribe();

    mutate(subject, (subject) => {
      subject.count++;
    });

    expect(listener).not.toHaveBeenCalled();
  });
});
