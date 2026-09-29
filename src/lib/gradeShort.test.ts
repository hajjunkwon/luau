import { describe, expect, it } from "vitest";
import { shortBank } from "../data/shorts";
import { gradeShort } from "./gradeShort";

describe("gradeShort", () => {
  it("accepts official answers and common wrappers", () => {
    expect(gradeShort("print", ["print", "print()"])).toBe(true);
    expect(gradeShort("Print()", ["print", "print()"])).toBe(true);
    expect(gradeShort("~=", ["~="])).toBe(true);
    expect(gradeShort("..", [".."])).toBe(true);
    expect(gradeShort("Instance.new(\"Part\")", ["Instance.new"])).toBe(true);
    expect(gradeShort(":Connect", ["Connect", ":Connect"])).toBe(true);
    expect(gradeShort("  local  ", ["local"])).toBe(true);
  });

  it("rejects blanks and wrong tokens", () => {
    expect(gradeShort("", ["print"])).toBe(false);
    expect(gradeShort("console.log", ["print"])).toBe(false);
    expect(gradeShort("!=", ["~="])).toBe(false);
  });
});

describe("shortBank", () => {
  it("has unique ids and non-empty answers", () => {
    const ids = shortBank.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(shortBank.length).toBeGreaterThanOrEqual(50);
    for (const item of shortBank) {
      expect(item.answers.length).toBeGreaterThan(0);
      expect(gradeShort(item.answers[0], item.answers)).toBe(true);
    }
  });
});
