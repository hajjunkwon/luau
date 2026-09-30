import type { CodeTask, GradeResult, RunResult } from "../types";
import { runLuau } from "./runtime";

function asDisplay(value: unknown): string {
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function sourceHas(source: string, needle: string): boolean {
  return source.replace(/\s+/g, " ").includes(needle.replace(/\s+/g, " "));
}

export async function gradeCode(task: CodeTask, source: string): Promise<GradeResult> {
  const messages: { ok: boolean; text: string }[] = [];
  let run: RunResult | null = null;
  const needsRun = task.tests.some(
    (t) =>
      t.kind === "output-equals" ||
      t.kind === "output-includes" ||
      t.kind === "output-lines" ||
      t.kind === "global-equals",
  );

  if (needsRun) {
    run = await runLuau(source, task.after ?? "", task.before ?? "");
    if (!run.ok) {
      messages.push({ ok: false, text: run.error ?? "실행 중 오류가 났습니다." });
      return { passed: false, messages, run };
    }
  }

  const outputText = (run?.output ?? []).join("\n").trim();

  for (const test of task.tests) {
    switch (test.kind) {
      case "source-includes": {
        const missing = test.values.filter((v) => !sourceHas(source, v));
        messages.push({
          ok: missing.length === 0,
          text:
            missing.length === 0
              ? "필요한 문법을 사용했습니다."
              : `코드에 이게 필요해요: ${missing.join(", ")}`,
        });
        break;
      }
      case "source-excludes": {
        const found = test.values.filter((v) => sourceHas(source, v));
        messages.push({
          ok: found.length === 0,
          text:
            found.length === 0
              ? "금지된 우회를 쓰지 않았습니다."
              : `이건 쓰지 마세요: ${found.join(", ")}`,
        });
        break;
      }
      case "source-regex": {
        const ok = new RegExp(test.pattern).test(source);
        messages.push({
          ok,
          text: ok ? "코드 패턴이 맞습니다." : "요청한 코드 형태와 조금 다릅니다.",
        });
        break;
      }
      case "output-equals": {
        const ok = outputText === test.value.trim();
        messages.push({
          ok,
          text: ok
            ? "출력이 정답과 같습니다."
            : `출력이 다릅니다. 기대값: ${test.value}`,
        });
        break;
      }
      case "output-includes": {
        const ok = outputText.includes(test.value);
        messages.push({
          ok,
          text: ok
            ? "출력에 필요한 값이 있습니다."
            : `출력에 "${test.value}"가 있어야 합니다.`,
        });
        break;
      }
      case "output-lines": {
        const lines = (run?.output ?? []).map((l) => l.trim());
        const ok =
          lines.length === test.values.length &&
          test.values.every((v, i) => lines[i] === v);
        messages.push({
          ok,
          text: ok
            ? "줄 단위 출력이 맞습니다."
            : `각 줄이 이 순서여야 합니다: ${test.values.join(" / ")}`,
        });
        break;
      }
      case "global-equals": {
        const actual = run?.globals[test.name];
        const ok = actual === test.value;
        messages.push({
          ok,
          text: ok
            ? `${test.name} 값이 맞습니다.`
            : `${test.name}은(는) ${asDisplay(test.value)}이어야 합니다. 현재: ${asDisplay(actual)}`,
        });
        break;
      }
    }
  }

  return { passed: messages.every((m) => m.ok), messages, run };
}
