import React from "react";

import { Routes, Route } from "react-router-dom";

import { TAppRouteProps, routeConfig } from "configs/route-config";

import { RequireAdmin } from "./RequireAdmin";
import { RequireSubscriber } from "./RequireSubscriber";

export const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: TAppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.subscriberOnly ? (
            <RequireSubscriber>{route.element}</RequireSubscriber>
          ) : route.adminOnly ? (
            <RequireAdmin>{route.element}</RequireAdmin>
          ) : (
            route.element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
