import { useGetActiveUser } from "hooks";
import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireSubscriberProps {
  children: JSX.Element;
}

export function RequireSubscriber(props: IRequireSubscriberProps) {
  const { children } = props;

  const { activeUserData, isActiveUserDataLoading } = useGetActiveUser();

  const isActiveUserHasSubscribeBase =
    !activeUserData || !activeUserData.subscribeBase;

  if (!isActiveUserDataLoading && isActiveUserHasSubscribeBase) {
    return <Navigate to={RouterPath.forbidden} />;
  }

  return children;
}
