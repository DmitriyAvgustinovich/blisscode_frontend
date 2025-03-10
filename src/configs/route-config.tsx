import { RouteProps } from "react-router-dom";

import { AdminPanelPage } from "pages/AdminPanelPage";
import { CvReviewResultsPage } from "pages/CvReviewResultsPage";
import { DisplayedSolutionsFilesListPage } from "pages/DisplayedSolutionsFilesListPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { KnowledgeBasePage } from "pages/KnowledgeBasePage";
import { MainPage } from "pages/MainPage";
import { PersonalAccountPage } from "pages/PersonalAccountPage";
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
  CV_REVIEW_RESULTS = "cv_review_results",
  PERSONAL_ACCOUNT = "personal_account",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.SOLUTION_FILE_VIEWER]: "/solution_file_viewer",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.DISPLAYED_SOLUTIONS_FILES_LIST]: "/displayed_solutions_files_list",
  [AppRoutes.KNOWLEDGE_BASE]: "/knowledge_base",
  [AppRoutes.THEORETICAL_TEST_RESULTS]: "/theoretical_test_results",
  [AppRoutes.CV_REVIEW_RESULTS]: "/cv_review_results",
  [AppRoutes.PERSONAL_ACCOUNT]: "/personal_account",
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
  [AppRoutes.CV_REVIEW_RESULTS]: {
    path: RouterPath.cv_review_results,
    element: (
      <LazyLoadChunk>
        <CvReviewResultsPage />
      </LazyLoadChunk>
    ),
    subscriberOnly: true,
  },
  [AppRoutes.PERSONAL_ACCOUNT]: {
    path: RouterPath.personal_account,
    element: (
      <LazyLoadChunk>
        <PersonalAccountPage />
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
