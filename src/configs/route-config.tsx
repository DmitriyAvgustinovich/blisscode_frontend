import { RouteProps } from "react-router-dom";

import { AdminPanelPage } from "pages/AdminPanelPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { SolutionFileViewerPage } from "pages/SolutionFileViewerPage";
import { SolutionsFilesPage } from "pages/SolutionsFilesPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  subscriberOnly?: boolean;
  adminOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  SOLUTION_FILE_VIEWER = "solution_file_viewer",
  ADMIN_PANEL = "admin_panel",
  SOLUTIONS_FILES = "solution_files",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.SOLUTION_FILE_VIEWER]: "/solution_file_viewer",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.SOLUTIONS_FILES]: "/solutions_files",
  [AppRoutes.FORBIDDEN]: "/forbidden",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
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
  [AppRoutes.SOLUTIONS_FILES]: {
    path: RouterPath.solution_files,
    element: (
      <LazyLoadChunk>
        <SolutionsFilesPage />
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
    subscriberOnly: true,
  },
};
