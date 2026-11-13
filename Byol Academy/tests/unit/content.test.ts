import { afterEach, describe, expect, it, vi } from "vitest";
import { platforms, shippable, stats } from "@/content/site";
import { demoQuestions } from "@/content/demo-data";

describe("approved content", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("filters items not approved for production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(shippable([{ value: "approved", approved: true }, { value: "pending", approved: false }]))
      .toEqual([{ value: "approved", approved: true }]);
  });

  it("preserves draft items in development for visible approval review", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(shippable([{ value: "draft", approved: false }])).toHaveLength(1);
  });

  it("includes only approved platform and stat copy", () => {
    expect(platforms.every((platform) => platform.approved)).toBe(true);
    expect(stats.every((stat) => stat.approved)).toBe(true);
  });

  it("keeps demo questions complete and answer indexes valid", () => {
    for (const [subject, questions] of Object.entries(demoQuestions)) {
      expect(questions).toHaveLength(3);
      for (const question of questions) {
        expect(question.concept.trim()).not.toBe("");
        expect(question.prompt.trim()).not.toBe("");
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(question.options.length);
        expect(question.options.every((option) => option.trim().length > 0)).toBe(true);
      }
      expect(subject.trim()).not.toBe("");
    }
  });
});
