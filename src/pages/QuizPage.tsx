import { useState } from "react";
import { Link } from "react-router-dom";
import { CodeMission } from "../components/CodeMission";
import { challengeBank, pickChallenges, QUIZ_LENGTH } from "../data/challenges";
import { setExamBest } from "../lib/progress";
import { useProgress } from "../lib/useProgress";
import type { CodeMission as Mission } from "../data/challenges";

export function QuizPage() {
  const progress = useProgress();
  const [items, setItems] = useState<Mission[] | null>(null);
  const [index, setIndex] = useState(0);
  const [passed, setPassed] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [solvedHere, setSolvedHere] = useState(false);

  const start = () => {
    setItems(pickChallenges());
    setIndex(0);
    setPassed([]);
    setDone(false);
    setSolvedHere(false);
  };

  const finish = (results: boolean[]) => {
    const score = results.filter(Boolean).length;
    setExamBest(score);
    setPassed(results);
    setDone(true);
  };

  if (!items) {
    return (
      <div className="page">
        <header className="page-head">
          <p className="eyebrow">퀴즈</p>
          <h1>조건을 보고 코드를 짜는 미션</h1>
          <p className="lede">
            플레이그라운드와 같은 편집기입니다. {challengeBank.length}개 미션 중
            {QUIZ_LENGTH}개를 무작위로 뽑습니다. 조건을 만족하도록 코드를 쓰고
            실행·채점하세요. 틀려도 고쳐서 다시 내면 됩니다.
          </p>
        </header>
        <div className="exam-intro">
          <p>
            최고점 <strong>{progress.examBest}</strong> / {QUIZ_LENGTH}
          </p>
          <button type="button" className="btn primary" onClick={start}>
            미션 시작
          </button>
          <Link className="btn ghost" to="/playground">
            플레이그라운드
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    const score = passed.filter(Boolean).length;
    return (
      <div className="page">
        <header className="page-head">
          <p className="eyebrow">결과</p>
          <h1>
            {score} / {items.length}
          </h1>
          <p className="lede">
            {score === items.length
              ? "전부 통과했습니다. 플레이그라운드에서 더 큰 스크립트를 짜 보세요."
              : "건너뛴 미션은 다시 풀기에서 다른 조합으로 나올 수 있습니다."}
          </p>
        </header>
        <ol className="review-list">
          {items.map((item, i) => (
            <li key={item.id} className={passed[i] ? "ok" : "bad"}>
              <p>
                <span>{passed[i] ? "통과" : "건너뜀"}</span> {item.prompt}
              </p>
              <small>{item.topic}</small>
            </li>
          ))}
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

  const goNext = (didPass: boolean) => {
    const nextPassed = [...passed, didPass];
    setSolvedHere(false);
    if (index + 1 >= items.length) finish(nextPassed);
    else {
      setPassed(nextPassed);
      setIndex((value) => value + 1);
    }
  };

  return (
    <div className="page quiz-mission">
      <header className="page-head split">
        <div>
          <p className="eyebrow">
            미션 {index + 1} / {items.length} · {current.topic}
          </p>
          <h1>{current.prompt}</h1>
        </div>
      </header>
      <CodeMission
        key={current.id}
        task={current}
        editorHeight="320px"
        onSolved={() => setSolvedHere(true)}
      />
      <div className="task-nav">
        <button type="button" className="btn ghost" onClick={() => goNext(false)}>
          건너뛰기
        </button>
        <button
          type="button"
          className="btn primary"
          disabled={!solvedHere}
          onClick={() => goNext(true)}
        >
          {index + 1 === items.length ? "결과 보기" : "다음 미션"}
        </button>
      </div>
    </div>
  );
}
