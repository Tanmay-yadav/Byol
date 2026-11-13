import { describe, expect, it } from "vitest";
import { masterySignal, updateMastery } from "@/lib/adaptive/mastery";

describe("illustrative mastery update", () => {
  it("raises an estimate after a correct response", () => {
    expect(updateMastery(0.5, true)).toBeGreaterThan(0.5);
  });

  it("lowers an estimate after an incorrect response", () => {
    expect(updateMastery(0.5, false)).toBeLessThan(0.5);
  });

  it("returns a probability within bounds", () => {
    for (const prior of [0, 0.2, 0.5, 0.9, 1]) {
      for (const correct of [true, false]) {
        const estimate = updateMastery(prior, correct);
        expect(estimate).toBeGreaterThanOrEqual(0);
        expect(estimate).toBeLessThanOrEqual(1);
      }
    }
  });

  it("rejects invalid probability values", () => {
    expect(() => updateMastery(-0.1, true)).toThrow(RangeError);
    expect(() => updateMastery(0.5, true, { guess: 1, slip: 0, learn: 0.1 })).toThrow(RangeError);
  });

  it("labels estimates with readable signal names", () => {
    expect(masterySignal(0.2)).toBe("developing");
    expect(masterySignal(0.5)).toBe("building");
    expect(masterySignal(0.8)).toBe("steady");
  });
});
