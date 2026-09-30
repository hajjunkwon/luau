import { useEffect, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { OutputConsole } from "./OutputConsole";
import { gradeCode } from "../lib/checkQuiz";
import { runLuau } from "../lib/runtime";
import type { CodeTask, GradeResult, RunResult } from "../types";

type Props = {
  task: CodeTask;
  onSolved?: () => void;
  editorHeight?: string;
};

export function CodeMission({ task, onSolved, editorHeight = "280px" }: Props) {
  const [code, setCode] = useState(task.starter);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [run, setRun] = useState<RunResult | null>(null);
  const [pending, setPending] = useState(false);
  const [fails, setFails] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(task.starter);
    setGrade(null);
    setRun(null);
    setFails(0);
    setShowSolution(false);
  }, [task.id, task.starter]);

  const runCurrent = async () => {
    setPending(true);
    setRun(await runLuau(code, task.after ?? "", task.before ?? ""));
    setPending(false);
  };

  const check = async () => {
    setPending(true);
    const result = await gradeCode(task, code);
    setGrade(result);
    setRun(result.run);
    setPending(false);
    if (result.passed) onSolved?.();
    else setFails((n) => n + 1);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        void runCurrent();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="task-card code-task">
      <p className="task-kind">코드 미션 · Ctrl/Cmd + Enter 실행</p>
      <h2>{task.prompt}</h2>
      {task.goals && task.goals.length > 0 ? (
        <ul className="goal-list">
          {task.goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      ) : null}
      <div className="editor-frame">
        <CodeEditor value={code} onChange={setCode} height={editorHeight} />
      </div>
      <div className="task-actions">
        <button type="button" className="btn ghost" onClick={() => void runCurrent()} disabled={pending}>
          실행
        </button>
        <button type="button" className="btn primary" onClick={() => void check()} disabled={pending}>
          채점
        </button>
        <button type="button" className="btn ghost" onClick={() => setCode(task.starter)}>
          초기화
        </button>
      </div>
      <OutputConsole run={run} pending={pending} />
      {grade ? (
        <ul className="grade-list">
          {grade.messages.map((message) => (
            <li key={message.text} className={message.ok ? "ok" : "bad"}>
              {message.ok ? "통과" : "실패"} · {message.text}
            </li>
          ))}
        </ul>
      ) : null}
      {grade?.passed ? <p className="feedback ok">조건을 모두 만족했습니다.</p> : null}
      {fails >= 1 ? <p className="hint">힌트: {task.hint}</p> : null}
      {fails >= 2 ? (
        <button type="button" className="btn ghost" onClick={() => setShowSolution(true)}>
          모범 답안 보기
        </button>
      ) : null}
      {showSolution ? (
        <pre className="code-sample">
          <code>{task.solution}</code>
        </pre>
      ) : null}
    </div>
  );
}
