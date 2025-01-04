import { useGetActiveUser } from "hooks";
import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireSubscriberProps {
  children: JSX.Element;
}

export function RequireSubscriber(props: IRequireSubscriberProps) {
  const { children } = props;

  const { activeUserData, isActiveUserDataLoading } = useGetActiveUser();

  // todo: доделать потом когда появится платежка
  if (!isActiveUserDataLoading && !activeUserData) {
    return <Navigate to={RouterPath.forbidden} />;
  }

  return children;
}
