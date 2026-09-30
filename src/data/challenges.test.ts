import { describe, expect, it } from "vitest";
import { challengeBank, pickChallenges, QUIZ_LENGTH } from "../data/challenges";
import { gradeCode } from "../lib/checkQuiz";

describe("challengeBank", () => {
  it("has unique ids and enough missions", () => {
    const ids = challengeBank.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(challengeBank.length).toBeGreaterThanOrEqual(30);
    expect(QUIZ_LENGTH).toBe(6);
    expect(pickChallenges().length).toBe(QUIZ_LENGTH);
  });

  it("accepts official solutions for every mission", async () => {
    for (const task of challengeBank) {
      const grade = await gradeCode(task, task.solution);
      expect(
        grade.passed,
        `${task.id}: ${grade.messages.map((m) => m.text).join("; ")} ${grade.run?.error ?? ""}`,
      ).toBe(true);
    }
  }, 40_000);
});
