import { cheatSections } from "../data/content";
import { resetProgress } from "../lib/progress";
import { useState } from "react";

export function GuidePage() {
  const [resetLabel, setResetLabel] = useState("진도 초기화");

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">문법 노트</p>
        <h1>자주 쓰는 Luau / Roblox 조각</h1>
        <p className="lede">
          이 연습장의 실행기는 Lua 5.4 기반입니다. 타입 표기와 += 는 실행 전에
          변환하고, continue나 문자열 보간은 아직 돌리지 않습니다. 실제 Studio의
          물리·네트워크·보안 문맥과는 다릅니다.
        </p>
      </header>
      <div className="cheat-grid">
        {cheatSections.map((section) => (
          <section key={section.title} className="cheat-card">
            <h2>{section.title}</h2>
            <table>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.token}>
                    <th>
                      <code>{row.token}</code>
                    </th>
                    <td>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
      <section className="danger-box">
        <h2>이 앱에 대해</h2>
        <p>
          코드는 브라우저 안의 샌드박스에서만 돕니다. os/io/require는 막아 두었고,
          긴 루프는 끊습니다. 학습이 끝나면 Roblox Studio에서 같은 코드를 다시
          붙여 보세요.
        </p>
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            resetProgress();
            setResetLabel("초기화했습니다");
          }}
        >
          {resetLabel}
        </button>
      </section>
    </div>
  );
}
