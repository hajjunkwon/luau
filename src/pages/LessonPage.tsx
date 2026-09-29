import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLesson, getNextLesson } from "../data/lessons";
import { CodeEditor } from "../components/CodeEditor";
import { OutputConsole } from "../components/OutputConsole";
import { gradeCode } from "../lib/checkQuiz";
import { markLesson, markTask, visitLesson } from "../lib/progress";
import { useProgress } from "../lib/useProgress";
import type { ChoiceTask, CodeTask, GradeResult, RunResult, ShortTask } from "../types";
import { runLuau } from "../lib/runtime";
import { gradeShort, primaryAnswer } from "../lib/gradeShort";

export function LessonPage() {
  const { id = "" } = useParams();
  const lesson = getLesson(id);
  const progress = useProgress();
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    if (lesson) visitLesson(lesson.id);
    setTaskIndex(0);
  }, [lesson?.id]);

  if (!lesson) return <Navigate to="/learn" replace />;

  const task = lesson.tasks[taskIndex];
  const nextLesson = getNextLesson(lesson.id);
  const completedCount = lesson.tasks.filter((t) =>
    progress.completedTasks.includes(t.id),
  ).length;

  return (
    <div className="page lesson-page">
      <header className="lesson-head">
        <Link to="/learn" className="back">
          학습 목록
        </Link>
        <div>
          <p className="eyebrow">
            레슨 {String(lesson.order).padStart(2, "0")} · {lesson.difficulty}
          </p>
          <h1>{lesson.title}</h1>
          <p className="lede">{lesson.subtitle}</p>
        </div>
        <div className="pill">
          과제 {completedCount}/{lesson.tasks.length}
        </div>
      </header>

      <div className="lesson-layout">
        <section className="theory">
          {lesson.theory.map((block) => (
            <article key={block.heading} className="theory-card">
              <h2>{block.heading}</h2>
              <p>{block.body}</p>
              {block.code ? (
                <pre className="code-sample">
                  <code>{block.code}</code>
                </pre>
              ) : null}
            </article>
          ))}
        </section>

        <section className="task-pane">
          <ol className="task-tabs">
            {lesson.tasks.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={index === taskIndex ? "active" : ""}
                  onClick={() => setTaskIndex(index)}
                >
                  {index + 1}
                  {progress.completedTasks.includes(item.id) ? " ✓" : ""}
                </button>
              </li>
            ))}
          </ol>
          {task.kind === "choice" ? (
            <ChoiceTaskView
              task={task}
              onSolved={() => {
                const next = markTask(task.id);
                if (lesson.tasks.every((t) => next.completedTasks.includes(t.id))) {
                  markLesson(lesson.id);
                }
              }}
            />
          ) : task.kind === "short" ? (
            <ShortTaskView
              task={task}
              onSolved={() => {
                const next = markTask(task.id);
                if (lesson.tasks.every((t) => next.completedTasks.includes(t.id))) {
                  markLesson(lesson.id);
                }
              }}
            />
          ) : (
            <CodeTaskView
              task={task}
              onSolved={() => {
                const next = markTask(task.id);
                if (lesson.tasks.every((t) => next.completedTasks.includes(t.id))) {
                  markLesson(lesson.id);
                }
              }}
            />
          )}
          {completedCount === lesson.tasks.length ? (
            <div className="lesson-done">
              이 레슨의 과제를 모두 통과했습니다.
              {nextLesson ? (
                <Link className="btn primary" to={`/learn/${nextLesson.id}`}>
                  다음 · {nextLesson.title}
                </Link>
              ) : (
                <Link className="btn primary" to="/quiz">
                  종합 퀴즈 보기
                </Link>
              )}
            </div>
          ) : (
            <div className="task-nav">
              <button
                type="button"
                className="btn ghost"
                disabled={taskIndex === 0}
                onClick={() => setTaskIndex((i) => Math.max(0, i - 1))}
              >
                이전 과제
              </button>
              <button
                type="button"
                className="btn ghost"
                disabled={taskIndex === lesson.tasks.length - 1}
                onClick={() =>
                  setTaskIndex((i) => Math.min(lesson.tasks.length - 1, i + 1))
                }
              >
                다음 과제
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ShortTaskView({
  task,
  onSolved,
}: {
  task: ShortTask;
  onSolved: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setDraft("");
    setChecked(false);
  }, [task.id]);

  const correct = gradeShort(draft, task.answers);

  return (
    <div className="task-card">
      <p className="task-kind">주관식</p>
      <h2>{task.prompt}</h2>
      <form
        className="short-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          setChecked(true);
          if (gradeShort(draft, task.answers)) onSolved();
        }}
      >
        <input
          className={`short-input ${checked ? (correct ? "right" : "wrong") : ""}`}
          value={draft}
          onChange={(event) => {
            setChecked(false);
            setDraft(event.target.value);
          }}
          placeholder={task.placeholder ?? "답을 입력하세요"}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <div className="task-actions">
          <button type="submit" className="btn primary" disabled={!draft.trim()}>
            정답 확인
          </button>
        </div>
      </form>
      {checked ? (
        <p className={`feedback ${correct ? "ok" : "bad"}`}>
          {correct ? "맞았습니다. " : `정답은 ${primaryAnswer(task.answers)} . `}
          {task.explain}
        </p>
      ) : (
        <p className="hint">키워드나 기호를 그대로 쓰면 됩니다. print() 처럼 괄호를 붙여도 됩니다.</p>
      )}
    </div>
  );
}

function ChoiceTaskView({
  task,
  onSolved,
}: {
  task: ChoiceTask;
  onSolved: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPicked(null);
    setChecked(false);
  }, [task.id]);

  const correct = picked === task.answer;

  return (
    <div className="task-card">
      <p className="task-kind">객관식</p>
      <h2>{task.prompt}</h2>
      <ul className="choices">
        {task.choices.map((choice, index) => {
          let state = "";
          if (checked && index === task.answer) state = "right";
          else if (checked && index === picked && !correct) state = "wrong";
          return (
            <li key={choice}>
              <button
                type="button"
                className={`choice ${picked === index ? "picked" : ""} ${state}`}
                onClick={() => {
                  setPicked(index);
                  setChecked(false);
                }}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {choice}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="task-actions">
        <button
          type="button"
          className="btn primary"
          disabled={picked === null}
          onClick={() => {
            setChecked(true);
            if (picked === task.answer) onSolved();
          }}
        >
          정답 확인
        </button>
      </div>
      {checked ? (
        <p className={`feedback ${correct ? "ok" : "bad"}`}>
          {correct ? "맞았습니다. " : "아닙니다. "}
          {task.explain}
        </p>
      ) : null}
    </div>
  );
}

function CodeTaskView({
  task,
  onSolved,
}: {
  task: CodeTask;
  onSolved: () => void;
}) {
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
    const result = await runLuau(code, task.after);
    setRun(result);
    setPending(false);
  };

  const check = async () => {
    setPending(true);
    const result = await gradeCode(task, code);
    setGrade(result);
    setRun(result.run);
    setPending(false);
    if (result.passed) onSolved();
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

  const hintVisible = fails >= 1;
  const editorHeight = useMemo(() => "260px", []);

  return (
    <div className="task-card code-task">
      <p className="task-kind">코드 과제 · Ctrl/Cmd + Enter 실행</p>
      <h2>{task.prompt}</h2>
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
        <button
          type="button"
          className="btn ghost"
          onClick={() => setCode(task.starter)}
        >
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
      {hintVisible ? <p className="hint">힌트: {task.hint}</p> : null}
      {fails >= 2 ? (
        <button
          type="button"
          className="btn ghost"
          onClick={() => setShowSolution(true)}
        >
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
