import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

const KEYWORDS = [
  "and",
  "break",
  "continue",
  "do",
  "else",
  "elseif",
  "end",
  "export",
  "false",
  "for",
  "function",
  "if",
  "in",
  "local",
  "nil",
  "not",
  "or",
  "repeat",
  "return",
  "then",
  "true",
  "type",
  "typeof",
  "until",
  "while",
];

const BUILTINS = [
  "print",
  "warn",
  "error",
  "assert",
  "pairs",
  "ipairs",
  "next",
  "select",
  "tonumber",
  "tostring",
  "type",
  "typeof",
  "pcall",
  "xpcall",
  "unpack",
  "setmetatable",
  "getmetatable",
  "rawget",
  "rawset",
  "rawequal",
  "wait",
  "tick",
  "time",
  "game",
  "workspace",
  "script",
  "task",
  "Instance",
  "Vector3",
  "Color3",
  "BrickColor",
  "Enum",
];

let registered = false;

export function registerLuau(monaco: typeof Monaco) {
  if (registered) return;
  registered = true;

  monaco.languages.register({ id: "luau", aliases: ["Luau", "Lua", "lua"] });

  monaco.languages.setLanguageConfiguration("luau", {
    comments: { lineComment: "--", blockComment: ["--[[", "]]"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(function|then|do|repeat|else|elseif|\{)\b.*$|.*\bfunction\s*\(.*\)\s*$/,
      decreaseIndentPattern: /^\s*(end|until|else|elseif|\}|\))\b/,
    },
  });

  monaco.languages.setMonarchTokensProvider("luau", {
    defaultToken: "",
    tokenPostfix: ".luau",
    keywords: KEYWORDS,
    builtins: BUILTINS,
    operators: [
      "+",
      "-",
      "*",
      "/",
      "//",
      "%",
      "^",
      "#",
      "==",
      "~=",
      "<=",
      ">=",
      "<",
      ">",
      "=",
      "+=",
      "-=",
      "*=",
      "/=",
      "..=",
      "..",
      "...",
      "->",
      "::",
      "?",
      "|",
      "&",
    ],
    symbols: /[=><!~?:&|+\-*/%^#]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|[0-7]{1,3})/,
    tokenizer: {
      root: [
        [/\@[A-Za-z_]\w*/, "annotation"],
        [
          /[A-Za-z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@builtins": "predefined",
              "@default": "identifier",
            },
          },
        ],
        { include: "@whitespace" },
        [/[{}()[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],
        [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/\d[0-9_]*/, "number"],
        [/[;,.]/, "delimiter"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
        [/`/, "string", "@string_interp"],
        [/\[(=*)\[/, "string", "@string_block"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/--\[\[/, "comment", "@comment"],
        [/--.*$/, "comment"],
      ],
      comment: [
        [/[^\]]+/, "comment"],
        [/\]\]/, "comment", "@pop"],
        [/./, "comment"],
      ],
      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      string_single: [
        [/[^\\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
      string_interp: [
        [/\{/, { token: "delimiter.bracket", next: "@interp_expr" }],
        [/[^\\`{]+/, "string"],
        [/@escapes/, "string.escape"],
        [/`/, "string", "@pop"],
      ],
      interp_expr: [
        [/\}/, { token: "delimiter.bracket", next: "@pop" }],
        { include: "root" },
      ],
      string_block: [
        [/[^\]]+/, "string"],
        [/\]=*\]/, { token: "string", next: "@pop" }],
        [/./, "string"],
      ],
    },
  });

  monaco.editor.defineTheme("luau-studio", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "D7DEE8" },
      { token: "comment", foreground: "6E7B8A", fontStyle: "italic" },
      { token: "keyword", foreground: "FF7A93" },
      { token: "number", foreground: "FFD36A" },
      { token: "number.float", foreground: "FFD36A" },
      { token: "number.hex", foreground: "FFD36A" },
      { token: "string", foreground: "C6F07A" },
      { token: "string.escape", foreground: "9EE8FF" },
      { token: "predefined", foreground: "7BD4FF" },
      { token: "operator", foreground: "E8EEF7" },
      { token: "annotation", foreground: "D8FF4A" },
      { token: "identifier", foreground: "D7DEE8" },
      { token: "delimiter", foreground: "9AA7B5" },
    ],
    colors: {
      "editor.background": "#10161f",
      "editor.foreground": "#D7DEE8",
      "editorLineNumber.foreground": "#4C5A6A",
      "editorLineNumber.activeForeground": "#9EE8FF",
      "editor.selectionBackground": "#1F4B73",
      "editor.lineHighlightBackground": "#182230",
      "editorCursor.foreground": "#D8FF4A",
      "editorWhitespace.foreground": "#243041",
      "editorIndentGuide.background": "#243041",
      "editorGutter.background": "#10161f",
      "scrollbarSlider.background": "#2A3848",
    },
  });

  monaco.languages.registerCompletionItemProvider("luau", {
    triggerCharacters: [".", ":"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const Kind = monaco.languages.CompletionItemKind;
      const snippets: Monaco.languages.CompletionItem[] = [
        {
          label: "print",
          kind: Kind.Function,
          insertText: "print(${1:value})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "값을 출력 콘솔에 적습니다.",
          range,
        },
        {
          label: "local",
          kind: Kind.Keyword,
          insertText: "local ${1:name} = ${2:value}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "로컬 변수를 만듭니다.",
          range,
        },
        {
          label: "function",
          kind: Kind.Snippet,
          insertText: "function ${1:name}(${2:args})\n\t${3:-- body}\nend",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "함수를 선언합니다.",
          range,
        },
        {
          label: "if",
          kind: Kind.Snippet,
          insertText: "if ${1:condition} then\n\t${2:-- body}\nend",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "for",
          kind: Kind.Snippet,
          insertText: "for ${1:i} = ${2:1}, ${3:10} do\n\t${4:print(i)}\nend",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "Instance.new",
          kind: Kind.Function,
          insertText: 'Instance.new("${1:Part}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Roblox 인스턴스를 만듭니다.",
          range,
        },
        {
          label: "Vector3.new",
          kind: Kind.Function,
          insertText: "Vector3.new(${1:0}, ${2:0}, ${3:0})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "Touched:Connect",
          kind: Kind.Snippet,
          insertText:
            "part.Touched:Connect(function(hit)\n\t${1:print(hit.Name)}\nend)",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "파트에 닿았을 때 실행되는 이벤트입니다.",
          range,
        },
        {
          label: "game:GetService",
          kind: Kind.Function,
          insertText: 'game:GetService("${1:Players}")',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "task.wait",
          kind: Kind.Function,
          insertText: "task.wait(${1:1})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
      ];
      return { suggestions: snippets };
    },
  });
}
