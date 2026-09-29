export type Difficulty = "입문" | "기초" | "실전";

export type TheoryBlock = {
  heading: string;
  body: string;
  code?: string;
};

export type ChoiceTask = {
  kind: "choice";
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type CodeTest =
  | { kind: "output-equals"; value: string }
  | { kind: "output-includes"; value: string }
  | { kind: "output-lines"; values: string[] }
  | { kind: "global-equals"; name: string; value: string | number | boolean }
  | { kind: "source-includes"; values: string[] }
  | { kind: "source-excludes"; values: string[] }
  | { kind: "source-regex"; pattern: string };

export type CodeTask = {
  kind: "code";
  id: string;
  prompt: string;
  starter: string;
  after?: string;
  tests: CodeTest[];
  hint: string;
  solution: string;
};

export type Task = ChoiceTask | CodeTask;

export type Lesson = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  minutes: number;
  theory: TheoryBlock[];
  tasks: Task[];
};

export type RunResult = {
  ok: boolean;
  output: string[];
  globals: Record<string, unknown>;
  error?: string;
};

export type GradeResult = {
  passed: boolean;
  messages: { ok: boolean; text: string }[];
  run: RunResult | null;
};

export type ProgressState = {
  completedLessons: string[];
  completedTasks: string[];
  examBest: number;
  lastLessonId: string | null;
};
