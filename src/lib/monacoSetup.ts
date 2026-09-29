import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { registerLuau } from "./luauLanguage";

let boot: Promise<typeof monaco> | null = null;

export function ensureMonaco(): Promise<typeof monaco> {
  if (!boot) {
    self.MonacoEnvironment = {
      getWorker: () => new editorWorker(),
    };
    loader.config({ monaco });
    boot = loader.init().then((m) => {
      registerLuau(m);
      return m;
    });
  }
  return boot;
}
