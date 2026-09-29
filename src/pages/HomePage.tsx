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
          바로 퀴즈로 확인하세요.
        </h1>
        <p className="lede">
          Studio를 열기 전에 print부터 Touched까지. 문법 강조 편집기에서 코드를
          실행하고, 레슨마다 퀴즈로 잠근 개념을 엽니다. 런타임은 학습용 모형이라
          실제 게임 서버는 아니지만, 스크립트 손맛은 그대로입니다.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to={`/learn/${continueLesson.id}`}>
            {done ? "이어서 학습" : "첫 레슨 시작"} · {continueLesson.title}
          </Link>
          <Link className="btn ghost" to="/playground">
            플레이그라운드
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
          <h2>레슨 퀴즈</h2>
          <p>
            객관식과 코드 제출이 섞여 있습니다. 출력이 맞는지, 필수 문법을 썼는지
            같이 채점합니다.
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
