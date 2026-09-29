import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { pickShortQuiz, QUIZ_LENGTH, shortBank } from "../data/shorts";
import { gradeShort, primaryAnswer } from "../lib/gradeShort";
import { setExamBest } from "../lib/progress";
import { useProgress } from "../lib/useProgress";
import type { ShortTask } from "../types";

export function QuizPage() {
  const progress = useProgress();
  const [items, setItems] = useState<ShortTask[] | null>(null);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = () => {
    setItems(pickShortQuiz());
    setIndex(0);
    setDraft("");
    setChecked(false);
    setAnswers([]);
    setDone(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [index, items, done]);

  const score = useMemo(() => {
    if (!items) return 0;
    return items.reduce(
      (sum, item, i) => sum + (gradeShort(answers[i] ?? "", item.answers) ? 1 : 0),
      0,
    );
  }, [items, answers]);

  if (!items) {
    return (
      <div className="page">
        <header className="page-head">
          <p className="eyebrow">퀴즈</p>
          <h1>키워드를 직접 쓰는 주관식</h1>
          <p className="lede">
            문제 은행 {shortBank.length}개 중에서 {QUIZ_LENGTH}문제를 무작위로
            냅니다. print, ~=, Instance.new 같은 짧은 답을 직접 입력하세요.
            대소문자와 괄호는 조금 느슨하게 봅니다.
          </p>
        </header>
        <div className="exam-intro">
          <p>
            최고점 <strong>{progress.examBest}</strong> / {QUIZ_LENGTH}
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
              ? "전부 맞았습니다. 플레이그라운드에서 파트를 하나 만들어 보세요."
              : "틀린 칸만 다시 보면 바로 붙습니다. 짧은 기호일수록 손보다 눈이 먼저입니다."}
          </p>
        </header>
        <ol className="review-list">
          {items.map((item, i) => {
            const ok = gradeShort(answers[i] ?? "", item.answers);
            return (
              <li key={item.id} className={ok ? "ok" : "bad"}>
                <p>
                  <span>{ok ? "정답" : "오답"}</span> {item.prompt}
                </p>
                <small>
                  {item.topic} · 내 답: {answers[i] || "(빈칸)"} · 정답:{" "}
                  {primaryAnswer(item.answers)}
                </small>
                <em>{item.explain}</em>
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
  const correct = gradeShort(draft, current.answers);

  const submit = () => {
    if (checked) {
      goNext(answers);
      return;
    }
    if (!draft.trim()) return;
    const nextAnswers = [...answers, draft];
    setAnswers(nextAnswers);
    setChecked(true);
  };

  const goNext = (recorded: string[]) => {
    setDraft("");
    setChecked(false);
    if (index + 1 >= items.length) {
      const nextScore = items.reduce(
        (sum, item, i) => sum + (gradeShort(recorded[i] ?? "", item.answers) ? 1 : 0),
        0,
      );
      setExamBest(nextScore);
      setDone(true);
    } else {
      setIndex((value) => value + 1);
    }
  };

  return (
    <div className="page">
      <header className="page-head split">
        <div>
          <p className="eyebrow">
            주관식 {index + 1} / {items.length}
            {current.topic ? ` · ${current.topic}` : ""}
          </p>
          <h1>{current.prompt}</h1>
        </div>
      </header>
      <form
        className="short-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <input
          ref={inputRef}
          className={`short-input ${checked ? (correct ? "right" : "wrong") : ""}`}
          value={draft}
          onChange={(event) => {
            if (checked) return;
            setDraft(event.target.value);
          }}
          placeholder={current.placeholder ?? "답을 입력하세요"}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          readOnly={checked}
        />
        <div className="task-actions">
          <button type="submit" className="btn primary" disabled={!checked && !draft.trim()}>
            {checked
              ? index + 1 === items.length
                ? "결과 보기"
                : "다음"
              : "확인"}
          </button>
        </div>
      </form>
      {checked ? (
        <p className={`feedback ${correct ? "ok" : "bad"}`}>
          {correct ? "맞았습니다. " : `정답은 ${primaryAnswer(current.answers)} . `}
          {current.explain}
        </p>
      ) : (
        <p className="hint">Enter로 확인합니다. print(), Connect 처럼 괄호를 붙여도 됩니다.</p>
      )}
    </div>
  );
}
