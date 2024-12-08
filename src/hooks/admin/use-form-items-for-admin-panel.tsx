import { Input, Select } from "antd";

import { UploadZipButton } from "components/UploadZipButton/UploadZipButton";

import { useGetAllDirectionsQuery } from "store/api/direction/direction-api";
import { useGetAllDirectionCategoriesQuery } from "store/api/direction_category/direction-category-api";
import { useGetAllDirectionsStacksQuery } from "store/api/direction_stack/direction-stack-api";

import {
  directionCategoryTableDataIndexes,
  directionCategoryTableLabels,
} from "constants/direction-category-constants";
import {
  directionTableDataIndexes,
  directionTableLabels,
} from "constants/direction-constants";
import {
  solutionFilesTableDataIndexes,
  solutionFilesTableLabels,
} from "constants/solution-files-constants";
import {
  stackTableDataIndexes,
  stackTableLabels,
} from "constants/stack-constants";

import { getDirectionsOptions } from "utils";

export const useGetFormItemsForAdminPanel = () => {
  const { data: allDirectionsData } = useGetAllDirectionsQuery();
  const { data: allStacksData } = useGetAllDirectionsStacksQuery();
  const { data: allDirectionCategoriesData } =
    useGetAllDirectionCategoriesQuery();

  const directionFormItems = [
    {
      label: directionTableLabels.name,
      name: directionTableDataIndexes.name,
      node: <Input />,
    },
    {
      label: directionTableLabels.tgCallbackData,
      name: directionTableDataIndexes.tgCallbackData,
      node: <Input defaultValue="direction_" />,
    },
  ];

  const stackFormItems = [
    {
      label: stackTableLabels.name,
      name: stackTableDataIndexes.name,
      node: <Input />,
    },
    {
      label: stackTableLabels.direction,
      name: stackTableDataIndexes.direction,
      node: <Select options={getDirectionsOptions(allDirectionsData ?? [])} />,
    },
    {
      label: stackTableLabels.tgCallbackData,
      name: stackTableDataIndexes.tgCallbackData,
      node: <Input defaultValue="stack_" />,
    },
  ];

  const directionCategoryFormItems = [
    {
      label: directionCategoryTableLabels.name,
      name: directionCategoryTableDataIndexes.name,
      node: <Input />,
    },
    {
      label: directionCategoryTableLabels.direction,
      name: directionCategoryTableDataIndexes.direction,
      node: <Select options={getDirectionsOptions(allDirectionsData ?? [])} />,
    },
    {
      label: directionCategoryTableLabels.stack,
      name: directionCategoryTableDataIndexes.stack,
      node: <Select options={getDirectionsOptions(allStacksData ?? [])} />,
    },
    {
      label: directionCategoryTableLabels.tgCallbackData,
      name: directionCategoryTableDataIndexes.tgCallbackData,
      node: <Input defaultValue="category_" />,
    },
  ];

  const solutionFileFormItems = [
    {
      label: solutionFilesTableLabels.filePath,
      name: solutionFilesTableDataIndexes.filePath,
      node: <UploadZipButton />,
    },
    {
      label: solutionFilesTableLabels.name,
      name: solutionFilesTableDataIndexes.name,
      node: <Input />,
    },
    {
      label: solutionFilesTableLabels.description,
      name: solutionFilesTableDataIndexes.description,
      node: <Input />,
    },
    {
      label: solutionFilesTableLabels.direction,
      name: solutionFilesTableDataIndexes.direction,
      node: <Select options={getDirectionsOptions(allDirectionsData ?? [])} />,
    },
    {
      label: solutionFilesTableLabels.stack,
      name: solutionFilesTableDataIndexes.stack,
      node: <Select options={getDirectionsOptions(allStacksData ?? [])} />,
    },
    {
      label: solutionFilesTableLabels.directionCategory,
      name: solutionFilesTableDataIndexes.directionCategory,
      node: (
        <Select
          options={getDirectionsOptions(allDirectionCategoriesData ?? [])}
        />
      ),
    },
  ];

  return {
    directionFormItems,
    stackFormItems,
    directionCategoryFormItems,
    solutionFileFormItems,
  };
};
