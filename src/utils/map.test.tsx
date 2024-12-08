import { describe, expect, test } from "vitest";
import { getProgress } from "./getProgress";

describe("map", () => {
  const { empty, implemented, missing, total } = getProgress();

  test("returns a number of combinations that don't have practical example", () => {
    expect(empty).toBe(11);
  });

  test("returns a number of implemented combinations", () => {
    expect(implemented).toBe(25);
  });

  test("returns a number of combinations with a missing example", () => {
    expect(missing).toBe(0);
  });

  test("returns a number of total combinations", () => {
    expect(total).toBe(36);
  });
});
