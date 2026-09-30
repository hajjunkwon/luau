import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CodeMission } from "../components/CodeMission";
import { getLesson, getNextLesson } from "../data/lessons";
import { markLesson, markTask, visitLesson } from "../lib/progress";
import { useProgress } from "../lib/useProgress";
import type { ChoiceTask } from "../types";

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

  const onSolved = (taskId: string) => {
    const next = markTask(taskId);
    if (lesson.tasks.every((t) => next.completedTasks.includes(t.id))) {
      markLesson(lesson.id);
    }
  };

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
            <ChoiceTaskView task={task} onSolved={() => onSolved(task.id)} />
          ) : task.kind === "code" ? (
            <CodeMission
              key={task.id}
              task={task}
              editorHeight="280px"
              onSolved={() => onSolved(task.id)}
            />
          ) : null}
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
