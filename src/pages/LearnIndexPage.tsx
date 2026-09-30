import { Link } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useProgress } from "../lib/useProgress";

export function LearnIndexPage() {
  const progress = useProgress();

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">학습</p>
        <h1>레슨 {lessons.length}개로 print부터 클릭·체력까지</h1>
        <p className="lede">
          각 레슨은 짧은 설명 뒤에 플레이그라운드와 같은 코드 미션이 이어집니다.
          조건을 보고 코드를 짜면, 이 브라우저에서 실행해 채점합니다.
        </p>
      </header>
      <div className="lesson-grid">
        {lessons.map((lesson) => {
          const cleared = progress.completedLessons.includes(lesson.id);
          const taskDone = lesson.tasks.filter((t) =>
            progress.completedTasks.includes(t.id),
          ).length;
          return (
            <Link key={lesson.id} to={`/learn/${lesson.id}`} className="lesson-card">
              <div className="lesson-card-top">
                <span className={`diff ${lesson.difficulty}`}>{lesson.difficulty}</span>
                {cleared ? <span className="pill ok">완료</span> : <span className="pill">{taskDone}/{lesson.tasks.length}</span>}
              </div>
              <h2>
                <span>{String(lesson.order).padStart(2, "0")}</span>
                {lesson.title}
              </h2>
              <p>{lesson.subtitle}</p>
              <small>{lesson.minutes}분 · 과제 {lesson.tasks.length}개</small>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
