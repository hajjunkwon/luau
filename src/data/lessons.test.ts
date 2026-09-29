import { describe, expect, it } from "vitest";
import { lessons } from "../data/lessons";

describe("lessons", () => {
  it("has unique ids and in-range answers", () => {
    const lessonIds = lessons.map((l) => l.id);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);

    const taskIds: string[] = [];
    for (const lesson of lessons) {
      expect(lesson.tasks.length).toBeGreaterThan(0);
      for (const task of lesson.tasks) {
        taskIds.push(task.id);
        if (task.kind === "choice") {
          expect(task.choices.length).toBeGreaterThan(1);
          expect(task.answer).toBeGreaterThanOrEqual(0);
          expect(task.answer).toBeLessThan(task.choices.length);
        } else {
          expect(task.tests.length).toBeGreaterThan(0);
          expect(task.solution.length).toBeGreaterThan(0);
        }
      }
    }
    expect(new Set(taskIds).size).toBe(taskIds.length);
  });
});
