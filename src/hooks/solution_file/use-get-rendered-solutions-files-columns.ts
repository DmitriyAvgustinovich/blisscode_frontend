import React from "react";

import { useGetDirectionByIdQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoryByIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStackByIdQuery } from "store/api/direction_stack/direction-stack-api";

import {
  directionCategoryTableDataIndexes,
  directionCategoryTableLabels,
} from "constants/direction-category-constants";
import {
  solutionFilesTableDataIndexes,
  solutionFilesTableLabels,
} from "constants/solution-files-constants";

export const useGetRenderedSolutionsFilesColumns = () => {
  const [directionId, setDirectionId] = React.useState<number | null>(null);
  const [directionStackId, setDirectionStackId] = React.useState<number | null>(
    null
  );
  const [directionCategoryId, setDirectionCategoryId] = React.useState<
    number | null
  >(null);
  const [directionName, setDirectionName] = React.useState<string | null>(null);
  const [stackName, setStackName] = React.useState<string | null>(null);
  const [categoryName, setCategoryName] = React.useState<string | null>(null);

  const prevDirectionIdRef = React.useRef<number | null>(null);
  const prevStackIdRef = React.useRef<number | null>(null);
  const prevCategoryIdRef = React.useRef<number | null>(null);

  const { data: directionData } = useGetDirectionByIdQuery(
    { id: directionId as number },
    { skip: !directionId }
  );

  const { data: directionStackData } = useGetDirectionStackByIdQuery(
    { id: directionStackId as number },
    { skip: !directionStackId }
  );

  const { data: directionCategoryData } = useGetDirectionCategoryByIdQuery(
    { id: directionCategoryId as number },
    { skip: !directionCategoryId }
  );

  React.useEffect(() => {
    if (directionData?.name) {
      setDirectionName(directionData.name);
    }
  }, [directionData?.name]);

  React.useEffect(() => {
    if (directionStackData?.name) {
      setStackName(directionStackData.name);
    }
  }, [directionStackData?.name]);

  React.useEffect(() => {
    if (directionCategoryData?.name) {
      setCategoryName(directionCategoryData.name);
    }
  }, [directionCategoryData?.name]);

  const directionColumn = React.useMemo(
    () => ({
      title: directionCategoryTableLabels.direction,
      dataIndex: directionCategoryTableDataIndexes.direction,
      render: (id: number) => {
        if (id !== prevDirectionIdRef.current) {
          prevDirectionIdRef.current = id;
          setTimeout(() => setDirectionId(id), 0);
        }
        return directionName;
      },
    }),
    [directionName]
  );

  const stackColumn = React.useMemo(
    () => ({
      title: directionCategoryTableLabels.stack,
      dataIndex: directionCategoryTableDataIndexes.stack,
      render: (id: number) => {
        if (id !== prevStackIdRef.current) {
          prevStackIdRef.current = id;
          setTimeout(() => setDirectionStackId(id), 0);
        }
        return stackName;
      },
    }),
    [stackName]
  );

  const categoryColumn = React.useMemo(
    () => ({
      title: solutionFilesTableLabels.directionCategory,
      dataIndex: solutionFilesTableDataIndexes.directionCategory,
      render: (id: number) => {
        if (id !== prevCategoryIdRef.current) {
          prevCategoryIdRef.current = id;
          setTimeout(() => setDirectionCategoryId(id), 0);
        }
        return categoryName;
      },
    }),
    [categoryName]
  );

  return { directionColumn, stackColumn, categoryColumn };
};
