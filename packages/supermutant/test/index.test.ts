import { onMutate, mutate } from "../src";
import { Event } from "eventery";

describe(onMutate, () => {
  it("returns an event object representing updates to the given subject", () => {
    const subject = {};
    const event = onMutate(subject);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(Event);
  });

  it("gets emitted when an update is performed on the subject", () => {
    const subject = {};

    const listener = jest.fn();
    onMutate(subject).subscribe(listener);

    mutate(subject);
    expect(listener).toHaveBeenCalled();
  });
});

describe(mutate, () => {
  it("notifies any subscribers about a mutation", () => {
    const subject = {};

    const listener = jest.fn();
    onMutate(subject).subscribe(listener);

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
