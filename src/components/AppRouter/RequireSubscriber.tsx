import { useGetActiveUser } from "hooks";
import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireSubscriberProps {
  children: JSX.Element;
}

export function RequireSubscriber(props: IRequireSubscriberProps) {
  const { children } = props;

  const { activeUserData, isActiveUserDataLoading } = useGetActiveUser();

  if (!isActiveUserDataLoading && (!activeUserData || !activeUserData.subscribeBase)) {
    return <Navigate to={RouterPath.forbidden} />;
  }

  return children;
}
