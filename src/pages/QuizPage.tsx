import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { allTasks } from "../data/lessons";
import { setExamBest } from "../lib/progress";
import { useProgress } from "../lib/useProgress";
import type { ChoiceTask } from "../types";

type ExamItem = {
  lessonTitle: string;
  task: ChoiceTask;
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildExam(count = 8): ExamItem[] {
  const pool = allTasks()
    .filter((item) => item.task.kind === "choice")
    .map((item) => ({
      lessonTitle: item.lesson.title,
      task: item.task as ChoiceTask,
    }));
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function QuizPage() {
  const progress = useProgress();
  const [items, setItems] = useState<ExamItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const start = () => {
    setItems(buildExam());
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  };

  const score = useMemo(() => {
    if (!items) return 0;
    return items.reduce(
      (sum, item, i) => sum + (answers[i] === item.task.answer ? 1 : 0),
      0,
    );
  }, [items, answers]);

  if (!items) {
    return (
      <div className="page">
        <header className="page-head">
          <p className="eyebrow">퀴즈</p>
          <h1>레슨에서 뽑은 종합 시험</h1>
          <p className="lede">
            객관식 8문제입니다. 레슨을 아직 안 끝냈어도 도전할 수 있지만, 학습을
            먼저 도는 편이 점수가 잘 나옵니다.
          </p>
        </header>
        <div className="exam-intro">
          <p>
            최고점 <strong>{progress.examBest}</strong> / 8
          </p>
          <button type="button" className="btn primary" onClick={start}>
            퀴즈 시작
          </button>
          <Link className="btn ghost" to="/learn">
            레슨으로
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="page">
        <header className="page-head">
          <p className="eyebrow">결과</p>
          <h1>
            {score} / {items.length}
          </h1>
          <p className="lede">
            {score === items.length
              ? "전부 맞았습니다. Studio에서 파트를 하나 만들어 보세요."
              : "틀린 문항의 레슨을 다시 보면 바로 붙습니다."}
          </p>
        </header>
        <ol className="review-list">
          {items.map((item, i) => {
            const ok = answers[i] === item.task.answer;
            return (
              <li key={item.task.id} className={ok ? "ok" : "bad"}>
                <p>
                  <span>{ok ? "정답" : "오답"}</span> {item.task.prompt}
                </p>
                <small>
                  {item.lessonTitle} · 정답: {item.task.choices[item.task.answer]}
                </small>
                <em>{item.task.explain}</em>
              </li>
            );
          })}
        </ol>
        <div className="hero-actions">
          <button type="button" className="btn primary" onClick={start}>
            다시 풀기
          </button>
          <Link className="btn ghost" to="/learn">
            레슨으로
          </Link>
        </div>
      </div>
    );
  }

  const current = items[index];

  return (
    <div className="page">
      <header className="page-head split">
        <div>
          <p className="eyebrow">
            문제 {index + 1} / {items.length} · {current.lessonTitle}
          </p>
          <h1>{current.task.prompt}</h1>
        </div>
      </header>
      <ul className="choices wide">
        {current.task.choices.map((choice, choiceIndex) => (
          <li key={choice}>
            <button
              type="button"
              className={`choice ${picked === choiceIndex ? "picked" : ""}`}
              onClick={() => setPicked(choiceIndex)}
            >
              <span>{String.fromCharCode(65 + choiceIndex)}</span>
              {choice}
            </button>
          </li>
        ))}
      </ul>
      <div className="task-actions">
        <button
          type="button"
          className="btn primary"
          disabled={picked === null}
          onClick={() => {
            if (picked === null) return;
            const nextAnswers = [...answers, picked];
            setAnswers(nextAnswers);
            setPicked(null);
            if (index + 1 >= items.length) {
              const nextScore = items.reduce(
                (sum, item, i) => sum + (nextAnswers[i] === item.task.answer ? 1 : 0),
                0,
              );
              setExamBest(nextScore);
              setDone(true);
            } else {
              setIndex((value) => value + 1);
            }
          }}
        >
          {index + 1 === items.length ? "결과 보기" : "다음"}
        </button>
      </div>
    </div>
  );
}
