import { useEffect, useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { OutputConsole } from "../components/OutputConsole";
import { playgroundTemplates } from "../data/content";
import { runLuau } from "../lib/runtime";
import type { RunResult } from "../types";

export function PlaygroundPage() {
  const [templateId, setTemplateId] = useState(playgroundTemplates[0].id);
  const [code, setCode] = useState(playgroundTemplates[0].code);
  const [run, setRun] = useState<RunResult | null>(null);
  const [pending, setPending] = useState(false);

  const applyTemplate = (id: string) => {
    const template = playgroundTemplates.find((item) => item.id === id);
    if (!template) return;
    setTemplateId(id);
    setCode(template.code);
    setRun(null);
  };

  const execute = async () => {
    setPending(true);
    setRun(await runLuau(code));
    setPending(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        void execute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="page playground">
      <header className="page-head split">
        <div>
          <p className="eyebrow">플레이그라운드</p>
          <h1>자유롭게 실행하는 Luau 편집기</h1>
          <p className="lede">
            템플릿을 고르거나 빈 파일에서 시작하세요. print, Instance, Vector3,
            ClickDetector, Humanoid, Touched:Fire 같은 학습용 API가 준비되어 있습니다.
          </p>
        </div>
        <button type="button" className="btn primary" onClick={() => void execute()} disabled={pending}>
          {pending ? "실행 중" : "실행"}
        </button>
      </header>
      <div className="playground-layout">
        <aside className="template-list">
          {playgroundTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={template.id === templateId ? "active" : ""}
              onClick={() => applyTemplate(template.id)}
            >
              <strong>{template.title}</strong>
              <small>{template.blurb}</small>
            </button>
          ))}
        </aside>
        <div className="playground-editor">
          <div className="editor-frame tall">
            <CodeEditor value={code} onChange={setCode} height="100%" />
          </div>
          <OutputConsole run={run} pending={pending} />
        </div>
      </div>
    </div>
  );
}
