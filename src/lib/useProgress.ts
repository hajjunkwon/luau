import { useEffect, useState } from "react";
import { loadProgress } from "./progress";
import type { ProgressState } from "../types";

export function useProgress(): ProgressState {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    const sync = () => setState(loadProgress());
    window.addEventListener("luau-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("luau-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return state;
}
