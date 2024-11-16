import { describe, expect, test } from "vitest";
import { getProgress } from "./getProgress";

describe("map", () => {
  const { current, total } = getProgress();

  test("checks all combinations", () => {
    expect(total).toBe(36);
  });

  test("checks implemented combinations", () => {
    expect(current).toBe(14);
  });
});
