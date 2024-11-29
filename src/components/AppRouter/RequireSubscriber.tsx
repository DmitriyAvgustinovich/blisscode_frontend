import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireSubscriberProps {
  children: JSX.Element;
}

export function RequireSubscriber(props: IRequireSubscriberProps) {
  const { children } = props;

  // const { authUserData, isUserDataLoading } = useGetAuthUser();

  const isSubscriberDataLoading = false;
  const subscriberData = true;

  if (!isSubscriberDataLoading && !subscriberData) {
    return <Navigate to={RouterPath.forbidden} />;
  }

  return children;
}
