import { useGetActiveUser } from "hooks";
import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireAdminProps {
  children: JSX.Element;
}

export function RequireAdmin(props: IRequireAdminProps) {
  const { children } = props;

  const { activeUserData, isActiveUserDataLoading, isActiveUserHasAdmin } =
    useGetActiveUser();

  if (!isActiveUserDataLoading && (!activeUserData || !isActiveUserHasAdmin)) {
    return <Navigate to={RouterPath.forbidden} />;
  }

  return children;
}
