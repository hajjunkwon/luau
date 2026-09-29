import type { ProgressState } from "../types";

const KEY = "luau-lab-progress-v1";

const empty: ProgressState = {
  completedLessons: [],
  completedTasks: [],
  examBest: 0,
  lastLessonId: null,
};

export function loadProgress(): ProgressState {
  if (typeof localStorage === "undefined") return { ...empty };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedLessons: parsed.completedLessons ?? [],
      completedTasks: parsed.completedTasks ?? [],
      examBest: parsed.examBest ?? 0,
      lastLessonId: parsed.lastLessonId ?? null,
    };
  } catch {
    return { ...empty };
  }
}

export function saveProgress(next: ProgressState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("luau-progress"));
}

export function markTask(taskId: string) {
  const p = loadProgress();
  if (!p.completedTasks.includes(taskId)) p.completedTasks.push(taskId);
  saveProgress(p);
  return p;
}

export function markLesson(lessonId: string) {
  const p = loadProgress();
  if (!p.completedLessons.includes(lessonId)) p.completedLessons.push(lessonId);
  p.lastLessonId = lessonId;
  saveProgress(p);
  return p;
}

export function visitLesson(lessonId: string) {
  const p = loadProgress();
  p.lastLessonId = lessonId;
  saveProgress(p);
  return p;
}

export function setExamBest(score: number) {
  const p = loadProgress();
  p.examBest = Math.max(p.examBest, score);
  saveProgress(p);
  return p;
}

export function resetProgress() {
  saveProgress({ ...empty });
  return { ...empty };
}
