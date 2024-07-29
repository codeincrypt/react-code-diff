// Home Page
import CodeDiff from "./page/CodeDiff";
import FileDiff from "./page/CodeDiff";
import GitDiff from "./page/CodeDiff";

export const MainRouter = [
  {
    path: "/",
    component: CodeDiff,
    exact: true,
  },
  {
    path: "/code-diff",
    component: CodeDiff,
    exact: true,
  },
  {
    path: "/FileDiff",
    component: FileDiff,
    exact: true,
  },
  {
    path: "/GitDiff",
    component: GitDiff,
    exact: true,
  },
];
