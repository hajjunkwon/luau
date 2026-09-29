const COMPOUND: Array<[RegExp, string]> = [
  [/\+=/g, "+"],
  [/\-=/g, "-"],
  [/\*=/g, "*"],
  [/\/\/=/g, "//"],
  [/\/=/g, "/"],
  [/%=/g, "%"],
  [/\^=/g, "^"],
  [/\.\.=/g, ".."],
];

function splitStrings(source: string): { text: string; isString: boolean }[] {
  const parts: { text: string; isString: boolean }[] = [];
  let i = 0;
  let buf = "";
  const push = (isString: boolean) => {
    if (buf.length) parts.push({ text: buf, isString });
    buf = "";
  };

  while (i < source.length) {
    const ch = source[i];
    if (ch === "-" && source[i + 1] === "-") {
      if (source[i + 2] === "[" && source[i + 3] === "[") {
        const end = source.indexOf("]]", i + 4);
        buf += source.slice(i, end === -1 ? source.length : end + 2);
        i = end === -1 ? source.length : end + 2;
        continue;
      }
      const end = source.indexOf("\n", i);
      buf += source.slice(i, end === -1 ? source.length : end);
      i = end === -1 ? source.length : end;
      continue;
    }
    if (ch === "'" || ch === '"') {
      push(false);
      const quote = ch;
      buf = quote;
      i += 1;
      while (i < source.length) {
        buf += source[i];
        if (source[i] === "\\" && i + 1 < source.length) {
          buf += source[i + 1];
          i += 2;
          continue;
        }
        if (source[i] === quote) {
          i += 1;
          break;
        }
        i += 1;
      }
      push(true);
      continue;
    }
    if (ch === "[" && source[i + 1] === "[") {
      push(false);
      const end = source.indexOf("]]", i + 2);
      buf = source.slice(i, end === -1 ? source.length : end + 2);
      i = end === -1 ? source.length : end + 2;
      push(true);
      continue;
    }
    buf += ch;
    i += 1;
  }
  push(false);
  return parts;
}

const TYPE = "[A-Za-z_][\\w.|?<>]*";

function stripTypesOutsideStrings(code: string): string {
  let s = code;
  s = s.replace(new RegExp(`::\\s*${TYPE}`, "g"), "");
  s = s.replace(/\)\s*:\s*[A-Za-z_][\w.|?<>]*/g, ")");
  s = s.replace(
    new RegExp(`(\\b(?:local|for)\\s+[A-Za-z_]\\w*)\\s*:\\s*${TYPE}`, "g"),
    "$1",
  );
  s = s.replace(
    new RegExp(`(\\(|,\\s*)([A-Za-z_]\\w*)\\s*:\\s*${TYPE}`, "g"),
    "$1$2",
  );
  return s;
}

function expandCompound(code: string): string {
  let result = code;
  for (const [opRe, luaOp] of COMPOUND) {
    const ident = "((?:[A-Za-z_][\\w.]*|\\)(?:\\.[A-Za-z_]\\w*)?)(?:\\s*\\[[^\\]]+\\])*)";
    const re = new RegExp(`${ident}\\s*${opRe.source}`, opRe.flags);
    result = result.replace(re, (_, left: string) => `${left} = ${left.trim()} ${luaOp} `);
  }
  return result;
}

export function detectUnsupported(source: string): string | null {
  const chunks = splitStrings(source)
    .filter((p) => !p.isString)
    .map((p) => p.text)
    .join("\n");
  if (/`/.test(source) && /`[^`]*\{/.test(source)) {
    return "문자열 보간(`Hello {name}`)은 이 연습장에서 아직 실행하지 않습니다. .. 연결을 사용해 보세요.";
  }
  if (/\bcontinue\b/.test(chunks)) {
    return "continue는 브라우저 런타임이 Lua 기반으로 동작해서 실행되지 않습니다. 조건문으로 건너뛰어 보세요.";
  }
  if (/\bexport\b/.test(chunks)) {
    return "export는 모듈 문법이라 여기서는 실행하지 않습니다.";
  }
  return null;
}

export function transpileLuau(source: string): string {
  const parts = splitStrings(source);
  return parts
    .map((part) => {
      if (part.isString) return part.text;
      return expandCompound(stripTypesOutsideStrings(part.text));
    })
    .join("");
}
