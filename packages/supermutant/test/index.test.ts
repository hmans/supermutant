import { onUpdate, update } from "../src";
import { Event } from "eventery";

describe(onUpdate, () => {
  it("returns an event object representing updates to the given subject", () => {
    const subject = {};
    const event = onUpdate(subject);

    expect(event).toBeDefined();
    expect(event).toBeInstanceOf(Event);
  });

  it("gets emitted when an update is performed on the subject", () => {
    const subject = {};

    const listener = jest.fn();
    onUpdate(subject).subscribe(listener);

    update(subject);
    expect(listener).toHaveBeenCalled();
  });
});
