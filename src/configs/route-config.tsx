import { RouteProps } from "react-router-dom";

import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  subscriberOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  FORBIDDEN = "forbidden",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
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
