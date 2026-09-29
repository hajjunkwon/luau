import type { RunResult } from "../types";

type Props = {
  run: RunResult | null;
  pending?: boolean;
  emptyHint?: string;
};

export function OutputConsole({ run, pending, emptyHint }: Props) {
  if (pending) {
    return (
      <div className="console">
        <div className="console-label">출력</div>
        <pre className="console-body muted">실행 중…</pre>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="console">
        <div className="console-label">출력</div>
        <pre className="console-body muted">{emptyHint ?? "실행하면 여기에 print 결과가 쌓입니다."}</pre>
      </div>
    );
  }

  if (!run.ok) {
    return (
      <div className="console">
        <div className="console-label warn">오류</div>
        <pre className="console-body error">{run.error}</pre>
      </div>
    );
  }

  const text = run.output.length ? run.output.join("\n") : "(출력 없음)";
  return (
    <div className="console">
      <div className="console-label">출력 · {run.output.length}줄</div>
      <pre className="console-body">{text}</pre>
    </div>
  );
}
