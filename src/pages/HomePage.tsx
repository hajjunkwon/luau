import { Link } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useProgress } from "../lib/useProgress";

export function HomePage() {
  const progress = useProgress();
  const continueLesson =
    lessons.find((l) => l.id === progress.lastLessonId) ??
    lessons.find((l) => !progress.completedLessons.includes(l.id)) ??
    lessons[0];
  const done = progress.completedLessons.length;

  return (
    <div className="page home">
      <section className="hero">
        <p className="eyebrow">브라우저에서 돌아가는 로블록스 스크립트 연습장</p>
        <h1>
          Luau를 쓰고,
          <br />
          조건에 맞게 코드를 짜세요.
        </h1>
        <p className="lede">
          Studio를 열기 전에 print부터 Humanoid까지. 문법 강조 편집기에서 코드를
          실행하고, 레슨과 퀴즈는 플레이그라운드와 같은 미션입니다. 조건을 보고
          코드를 짜면, 실행 결과로 채점합니다.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to={`/learn/${continueLesson.id}`}>
            {done ? "이어서 학습" : "첫 레슨 시작"} · {continueLesson.title}
          </Link>
          <Link className="btn ghost" to="/playground">
            플레이그라운드
          </Link>
          <Link className="btn ghost" to="/quiz">
            코딩 미션
          </Link>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>레슨</dt>
            <dd>{lessons.length}</dd>
          </div>
          <div>
            <dt>완료</dt>
            <dd>{done}</dd>
          </div>
          <div>
            <dt>퀴즈 최고점</dt>
            <dd>{progress.examBest}</dd>
          </div>
        </dl>
      </section>

      <section className="feature-grid">
        <article>
          <h2>Luau 편집기</h2>
          <p>
            키워드, 문자열, 주석, Instance 자동완성이 있는 다크 에디터입니다.
            Ctrl/Cmd + Enter로 바로 실행하세요.
          </p>
        </article>
        <article>
          <h2>실행 콘솔</h2>
          <p>
            print 결과를 모읍니다. Vector3, Part, Players 같은 자주 쓰는 API는
            학습용으로 흉내 내 두었습니다.
          </p>
        </article>
        <article>
          <h2>코딩 미션</h2>
          <p>
            조건을 주고 코드를 짜게 합니다. 실행이 잘 되고 출력이 맞으면
            통과입니다. 퀴즈는 미션 은행에서 무작위로 뽑습니다.
          </p>
        </article>
      </section>

      <section className="path">
        <header>
          <h2>학습 경로</h2>
          <Link to="/learn">전체 보기</Link>
        </header>
        <ol className="path-list">
          {lessons.map((lesson) => {
            const cleared = progress.completedLessons.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <Link to={`/learn/${lesson.id}`} className={cleared ? "done" : ""}>
                  <span className="idx">{String(lesson.order).padStart(2, "0")}</span>
                  <span>
                    <strong>{lesson.title}</strong>
                    <small>
                      {lesson.difficulty} · {lesson.minutes}분
                    </small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
