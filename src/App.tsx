import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LearnIndexPage } from "./pages/LearnIndexPage";
import { GuidePage } from "./pages/GuidePage";
import { QuizPage } from "./pages/QuizPage";

const LessonPage = lazy(() =>
  import("./pages/LessonPage").then((module) => ({ default: module.LessonPage })),
);
const PlaygroundPage = lazy(() =>
  import("./pages/PlaygroundPage").then((module) => ({ default: module.PlaygroundPage })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnIndexPage />} />
          <Route path="/learn/:id" element={<LessonPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
