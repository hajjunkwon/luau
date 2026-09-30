import { describe, expect, it } from "vitest";
import { lessons } from "../data/lessons";
import { gradeCode } from "./checkQuiz";
import { runLuau } from "./runtime";

describe("runLuau", () => {
  it("captures print output", async () => {
    const result = await runLuau('print("Hello Roblox")');
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["Hello Roblox"]);
  });

  it("transpiles += before running", async () => {
    const result = await runLuau("local score = 10\nscore += 5\nprint(score)");
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["15"]);
  });

  it("mocks Instance.new and workspace", async () => {
    const result = await runLuau(`
local part = Instance.new("Part")
part.Name = "Beacon"
part.Parent = workspace
print(part.Name)
print(part.Parent.Name)
`);
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["Beacon", "Workspace"]);
  });

  it("runs Humanoid TakeDamage", async () => {
    const result = await runLuau(`
local humanoid = Instance.new("Humanoid")
humanoid:TakeDamage(30)
print(humanoid.Health)
`);
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["70"]);
  });

  it("fires ClickDetector MouseClick", async () => {
    const result = await runLuau(
      `
local detector = Instance.new("ClickDetector")
detector.MouseClick:Connect(function()
  print("opened")
end)
`,
      "detector.MouseClick:Fire()",
    );
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["opened"]);
  });

  it("runs before setup then user code", async () => {
    const result = await runLuau(
      `print(workspace:WaitForChild("Door").Name)`,
      "",
      `local door = Instance.new("Part")
door.Name = "Door"
door.Parent = workspace
`,
    );
    expect(result.ok).toBe(true);
    expect(result.output).toEqual(["Door"]);
  });
});

describe("gradeCode solutions", () => {
  it("accepts official solutions for every code task", async () => {
    for (const lesson of lessons) {
      for (const task of lesson.tasks) {
        if (task.kind !== "code") continue;
        const grade = await gradeCode(task, task.solution);
        expect(
          grade.passed,
          `${task.id}: ${grade.messages.map((m) => m.text).join("; ")} ${grade.run?.error ?? ""}`,
        ).toBe(true);
      }
    }
  }, 20_000);
});
