import React from "react";

import { useLocation } from "react-router-dom";

const paramsToObject = (entries: IterableIterator<[string, string]>) => {
  const result: { [key: string]: string } = {};

  for (const [key, value] of entries) {
    result[key] = value;
  }

  return result;
};

export const useGetSearchParams = () => {
  const { search } = useLocation();
  
  return React.useMemo(
    () => paramsToObject(new URLSearchParams(search).entries()),
    [search]
  );
};
