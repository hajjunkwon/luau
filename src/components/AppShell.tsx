import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { lessons } from "../data/lessons";
import { useProgress } from "../lib/useProgress";

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M6 24 L20 17 L34 24 L20 31 Z" fill="#00a2ff" />
      <path d="M6 24 L20 17 L20 10 L6 17 Z" fill="#7ad0ff" />
      <path d="M20 17 L34 24 L34 17 L20 10 Z" fill="#0066aa" />
      <rect x="16" y="14" width="9" height="2.2" rx="0.6" fill="#d8ff4a" />
      <rect x="16" y="18.2" width="6" height="2.2" rx="0.6" fill="#d8ff4a" />
    </svg>
  );
}

export function AppShell() {
  const progress = useProgress();
  const done = progress.completedLessons.length;
  const pct = Math.round((done / lessons.length) * 100);

  return (
    <div className="shell">
      <aside className="rail">
        <NavLink to="/" className="brand" end>
          <LogoMark />
          <span>
            <strong>LUAU LAB</strong>
            <small>로블록스 스크립트</small>
          </span>
        </NavLink>
        <nav className="rail-nav">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/learn">학습</NavLink>
          <NavLink to="/quiz">퀴즈</NavLink>
          <NavLink to="/playground">플레이그라운드</NavLink>
          <NavLink to="/guide">문법 노트</NavLink>
        </nav>
        <div className="rail-progress">
          <div className="rail-progress-label">
            진도 {done}/{lessons.length}
          </div>
          <div className="meter">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      </aside>
      <div className="shell-main">
        <Suspense fallback={<div className="page lede">화면을 준비하는 중…</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
