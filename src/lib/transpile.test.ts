import { describe, expect, it } from "vitest";
import { detectUnsupported, transpileLuau } from "./transpile";

describe("transpileLuau", () => {
  it("expands compound assignment", () => {
    expect(transpileLuau("score += 5").replace(/\s+/g, " ").trim()).toBe(
      "score = score + 5",
    );
    expect(transpileLuau('name ..= "x"').includes("name = name ..")).toBe(true);
  });

  it("strips simple type annotations without eating the next parameter", () => {
    const out = transpileLuau(
      "function add(a: number, b: number): number\n  return a + b\nend",
    );
    expect(out).toContain("function add(a, b)");
    expect(out).not.toContain(": number");
  });

  it("does not treat method calls as type annotations", () => {
    expect(transpileLuau('print(workspace:WaitForChild("Door").Name)')).toBe(
      'print(workspace:WaitForChild("Door").Name)',
    );
    expect(transpileLuau('print(workspace:FindFirstChild("Flag").Name)')).toBe(
      'print(workspace:FindFirstChild("Flag").Name)',
    );
  });

  it("flags continue and interpolation", () => {
    expect(detectUnsupported("continue")).toMatch(/continue/);
    expect(detectUnsupported("`Hi {name}`")).toMatch(/보간/);
  });
});
