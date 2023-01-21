import { add } from "../src";

describe(add, () => {
  it("adds two numberts", () => {
    expect(add(1, 2)).toBe(3);
  });
});
