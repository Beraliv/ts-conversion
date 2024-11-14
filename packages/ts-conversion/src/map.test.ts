import { describe, expect, test } from "vitest";
import { map } from "./map";

describe("map", () => {
  test("checks all combinations", () => {
    const allCombinations = Object.values(map).flatMap((value) =>
      Object.values(value)
    );

    expect(allCombinations.length).toBe(36);
  });

  test("checks implemented combinations", () => {
    const allCombinations = Object.values(map).flatMap((value) =>
      Object.values(value)
    );
    const implementedCombinations = allCombinations.filter(Boolean);

    expect(implementedCombinations.length).toBe(11);
  });
});
