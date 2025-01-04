import { FormInstance, Input, Select } from "antd";

import { UploadZipSolutionFileButton } from "components/AdminPanel/UploadZipSolutionFileButton/UploadZipSolutionFileButton";

import { useGetAllDirectionsQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoriesByDirectionIdAndStackIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStacksByDirectionIdQuery } from "store/api/direction_stack/direction-stack-api";

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

interface IUseGetFormItemsForAdminPanelArgs {
  solutionFileName?: string;
  formState: FormInstance;
}

export const useGetFormItemsForAdminPanel = (
  args: IUseGetFormItemsForAdminPanelArgs
) => {
  const { solutionFileName, formState } = args;

  const directionId = formState?.getFieldValue(
    solutionFilesTableDataIndexes.direction
  );

  const stackId = formState?.getFieldValue(solutionFilesTableDataIndexes.stack);

  const { data: allDirectionsData } = useGetAllDirectionsQuery();

  const { data: stacksByDirectionIdData, refetch: refetchStacksByDirectionId } =
    useGetDirectionStacksByDirectionIdQuery(
      {
        direction_id: directionId,
      },
      {
        skip: !directionId,
      }
    );

  const {
    data: categoriesByDirectionIdAndStackIdData,
    refetch: refetchCategoriesByDirectionIdAndStackId,
  } = useGetDirectionCategoriesByDirectionIdAndStackIdQuery({
    direction_id: directionId,
    stack_id: stackId,
  });

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

  const directionStackFormItems = [
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
      node: (
        <Select
          options={getDirectionsOptions(allDirectionsData ?? [])}
          onChange={(directionId) => {
            formState?.setFieldsValue({
              [directionCategoryTableDataIndexes.direction]: directionId,
              [directionCategoryTableDataIndexes.stack]: null,
            });

            refetchStacksByDirectionId();
          }}
        />
      ),
    },
    {
      label: directionCategoryTableLabels.stack,
      name: directionCategoryTableDataIndexes.stack,
      node: (
        <Select options={getDirectionsOptions(stacksByDirectionIdData ?? [])} />
      ),
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
      node: (
        <UploadZipSolutionFileButton existSolutionFileName={solutionFileName} />
      ),
    },
    {
      label: solutionFilesTableLabels.name,
      name: solutionFilesTableDataIndexes.name,
      node: <Input />,
    },
    {
      label: solutionFilesTableLabels.description,
      name: solutionFilesTableDataIndexes.description,
      node: <Input.TextArea rows={4} />,
    },
    {
      label: solutionFilesTableLabels.direction,
      name: solutionFilesTableDataIndexes.direction,
      node: (
        <Select
          options={getDirectionsOptions(allDirectionsData ?? [])}
          onChange={(directionId) => {
            formState?.setFieldsValue({
              [solutionFilesTableDataIndexes.direction]: directionId,
              [solutionFilesTableDataIndexes.stack]: null,
              [solutionFilesTableDataIndexes.directionCategory]: null,
            });

            refetchStacksByDirectionId();
            refetchCategoriesByDirectionIdAndStackId();
          }}
        />
      ),
    },
    {
      label: solutionFilesTableLabels.stack,
      name: solutionFilesTableDataIndexes.stack,
      node: (
        <Select
          options={getDirectionsOptions(stacksByDirectionIdData ?? [])}
          onChange={(stackId) => {
            formState?.setFieldsValue({
              [solutionFilesTableDataIndexes.stack]: stackId,
              [solutionFilesTableDataIndexes.directionCategory]: null,
            });

            refetchCategoriesByDirectionIdAndStackId();
          }}
        />
      ),
    },
    {
      label: solutionFilesTableLabels.directionCategory,
      name: solutionFilesTableDataIndexes.directionCategory,
      node: (
        <Select
          options={getDirectionsOptions(
            categoriesByDirectionIdAndStackIdData ?? []
          )}
        />
      ),
    },
  ];

  return {
    directionFormItems,
    directionStackFormItems,
    directionCategoryFormItems,
    solutionFileFormItems,
  };
};
