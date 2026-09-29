import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { ensureMonaco } from "../lib/monacoSetup";

type Props = {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
};

export function CodeEditor({ value, onChange, height = "100%", readOnly }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureMonaco().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="editor-fallback" style={{ height }}>
        에디터 엔진을 불러오는 중…
      </div>
    );
  }

  return (
    <Editor
      height={height}
      language="luau"
      theme="luau-studio"
      value={value}
      onChange={(next) => onChange(next ?? "")}
      options={{
        readOnly,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 14,
        lineHeight: 22,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        renderLineHighlight: "line",
        padding: { top: 12, bottom: 12 },
        cursorBlinking: "smooth",
        smoothScrolling: true,
        wordWrap: "on",
        wrappingIndent: "indent",
        glyphMargin: false,
        folding: true,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
}
