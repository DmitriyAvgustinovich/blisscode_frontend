import { RouteProps } from "react-router-dom";

import { AdminPanelPage } from "pages/AdminPanelPage";
import { DisplayedSolutionsFilesListPage } from "pages/DisplayedSolutionsFilesListPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import KnowledgeBasePage from "pages/KnowledgeBasePage/KnowledgeBasePage";
import { MainPage } from "pages/MainPage";
import { SolutionFileViewerPage } from "pages/SolutionFileViewerPage";
import { TheoreticalTestResultsPage } from "pages/TheoreticalTestResultsPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  subscriberOnly?: boolean;
  adminOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  SOLUTION_FILE_VIEWER = "solution_file_viewer",
  ADMIN_PANEL = "admin_panel",
  DISPLAYED_SOLUTIONS_FILES_LIST = "displayed_solutions_files_list",
  KNOWLEDGE_BASE = "knowledge_base",
  THEORETICAL_TEST_RESULTS = "theoretical_test_results",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.SOLUTION_FILE_VIEWER]: "/solution_file_viewer",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.DISPLAYED_SOLUTIONS_FILES_LIST]: "/displayed_solutions_files_list",
  [AppRoutes.KNOWLEDGE_BASE]: "/knowledge_base",
  [AppRoutes.THEORETICAL_TEST_RESULTS]: "/theoretical_test_results",
  [AppRoutes.FORBIDDEN]: "/forbidden",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: (
      <LazyLoadChunk>
        <MainPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.SOLUTION_FILE_VIEWER]: {
    path: RouterPath.solution_file_viewer,
    element: (
      <LazyLoadChunk>
        <SolutionFileViewerPage />
      </LazyLoadChunk>
    ),
    subscriberOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: (
      <LazyLoadChunk>
        <AdminPanelPage />
      </LazyLoadChunk>
    ),
    adminOnly: true,
  },
  [AppRoutes.DISPLAYED_SOLUTIONS_FILES_LIST]: {
    path: RouterPath.displayed_solutions_files_list,
    element: (
      <LazyLoadChunk>
        <DisplayedSolutionsFilesListPage />
      </LazyLoadChunk>
    ),
    subscriberOnly: true,
  },
  [AppRoutes.KNOWLEDGE_BASE]: {
    path: RouterPath.knowledge_base,
    element: (
      <LazyLoadChunk>
        <KnowledgeBasePage />
      </LazyLoadChunk>
    ),
    subscriberOnly: true,
  },
  [AppRoutes.THEORETICAL_TEST_RESULTS]: {
    path: RouterPath.theoretical_test_results,
    element: (
      <LazyLoadChunk>
        <TheoreticalTestResultsPage />
      </LazyLoadChunk>
    ),
    subscriberOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: (
      <LazyLoadChunk>
        <ForbiddenPage />
      </LazyLoadChunk>
    ),
  },
};
