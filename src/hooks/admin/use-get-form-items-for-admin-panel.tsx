import React from "react";

import { FormInstance, Input, Select } from "antd";

import { UploadZipSolutionFileButton } from "components/AdminPanel/UploadZipSolutionFileButton/UploadZipSolutionFileButton";
import { MarkdownEditor } from "components/MarkdownEditor/MarkdownEditor";

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
  knowledgeBaseDataIndexes,
  knowledgeBaseLabels,
} from "constants/knowledge-base-constants";
import {
  solutionFilesDataIndexes,
  solutionFilesLabels,
} from "constants/solution-files-constants";
import {
  stackTableDataIndexes,
  stackTableLabels,
} from "constants/stack-constants";

import { getDirectionsOptions } from "utils";

import { ETypesKnowledge } from "types";

interface IUseGetFormItemsForAdminPanelArgs {
  solutionFileName?: string;
  formState: FormInstance;
}

export const useGetFormItemsForAdminPanel = (
  args: IUseGetFormItemsForAdminPanelArgs
) => {
  const { solutionFileName, formState } = args;

  const [selectedDirectionId, setSelectedDirectionId] = React.useState<
    number | null
  >(null);

  const [selectedStackId, setSelectedStackId] = React.useState<number | null>(
    null
  );

  const [knowledgeType, setKnowledgeType] = React.useState("");

  const directionIdFromFormState = formState?.getFieldValue(
    solutionFilesDataIndexes.direction
  );

  const stackIdFromFormState = formState?.getFieldValue(
    solutionFilesDataIndexes.stack
  );

  const { data: allDirectionsData } = useGetAllDirectionsQuery();

  React.useEffect(() => {
    setSelectedDirectionId(directionIdFromFormState);
    setSelectedStackId(stackIdFromFormState);
  }, [directionIdFromFormState, formState, stackIdFromFormState]);

  const { data: stacksByDirectionIdData } =
    useGetDirectionStacksByDirectionIdQuery(
      {
        direction_id: selectedDirectionId ?? directionIdFromFormState,
      },
      {
        skip: !selectedDirectionId,
      }
    );

  const { data: categoriesByDirectionIdAndStackIdData } =
    useGetDirectionCategoriesByDirectionIdAndStackIdQuery(
      {
        direction_id: selectedDirectionId ?? directionIdFromFormState,
        stack_id: selectedStackId ?? stackIdFromFormState,
      },
      {
        skip: !selectedDirectionId || !selectedStackId,
      }
    );

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
            setSelectedDirectionId(directionId);

            formState?.setFieldsValue({
              [directionCategoryTableDataIndexes.stack]: null,
            });
          }}
        />
      ),
    },
    {
      label: directionCategoryTableLabels.stack,
      name: directionCategoryTableDataIndexes.stack,
      node: (
        <Select
          options={getDirectionsOptions(stacksByDirectionIdData ?? [])}
          onChange={(stackId) => {
            setSelectedStackId(stackId);
          }}
          disabled={!selectedDirectionId}
        />
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
      label: solutionFilesLabels.filePath,
      name: solutionFilesDataIndexes.filePath,
      node: (
        <UploadZipSolutionFileButton existSolutionFileName={solutionFileName} />
      ),
    },
    {
      label: solutionFilesLabels.name,
      name: solutionFilesDataIndexes.name,
      node: <Input />,
    },
    {
      label: solutionFilesLabels.description,
      name: solutionFilesDataIndexes.description,
      node: (
        <MarkdownEditor
          formState={formState}
          fieldDataIndex={solutionFilesDataIndexes.description}
        />
      ),
    },
    {
      label: solutionFilesLabels.direction,
      name: solutionFilesDataIndexes.direction,
      node: (
        <Select
          options={getDirectionsOptions(allDirectionsData ?? [])}
          onChange={(directionId) => {
            setSelectedDirectionId(directionId);

            formState?.setFieldsValue({
              [solutionFilesDataIndexes.direction]: directionId,
              [solutionFilesDataIndexes.stack]: null,
              [solutionFilesDataIndexes.directionCategory]: null,
            });
          }}
        />
      ),
    },
    {
      label: solutionFilesLabels.stack,
      name: solutionFilesDataIndexes.stack,
      node: (
        <Select
          options={getDirectionsOptions(stacksByDirectionIdData ?? [])}
          onChange={(stackId) => {
            setSelectedStackId(stackId);

            formState?.setFieldsValue({
              [solutionFilesDataIndexes.directionCategory]: null,
            });
          }}
          disabled={!selectedDirectionId}
        />
      ),
    },
    {
      label: solutionFilesLabels.directionCategory,
      name: solutionFilesDataIndexes.directionCategory,
      node: (
        <Select
          options={getDirectionsOptions(
            categoriesByDirectionIdAndStackIdData ?? []
          )}
          disabled={!selectedDirectionId || !selectedStackId}
        />
      ),
    },
  ];

  const knowledgeTypesOptions = [
    {
      label: "Сообщение",
      value: ETypesKnowledge.MESSAGE,
    },
    {
      label: "Ссылка",
      value: ETypesKnowledge.LINK,
    },
    {
      label: "Конспект",
      value: ETypesKnowledge.ABSTRACT,
    },
  ];

  const knowledgeBaseFormItems = [
    {
      label: knowledgeBaseLabels.title,
      name: knowledgeBaseDataIndexes.title,
      node: <Input />,
    },
    {
      label: knowledgeBaseLabels.text,
      name: knowledgeBaseDataIndexes.text,
      node: (
        <MarkdownEditor
          formState={formState}
          fieldDataIndex={knowledgeBaseDataIndexes.text}
        />
      ),
    },
    {
      label: knowledgeBaseLabels.type,
      name: knowledgeBaseDataIndexes.type,
      node: (
        <Select
          options={knowledgeTypesOptions}
          onChange={(event) => setKnowledgeType(event)}
        />
      ),
    },
    ...(knowledgeType === ETypesKnowledge.LINK
      ? [
          {
            label: knowledgeBaseLabels.link,
            name: knowledgeBaseDataIndexes.link,
            node: <Input />,
          },
        ]
      : []),
    {
      label: knowledgeBaseLabels.direction,
      name: knowledgeBaseDataIndexes.direction,
      node: <Select options={getDirectionsOptions(allDirectionsData ?? [])} />,
    },
  ];

  return {
    directionFormItems,
    directionStackFormItems,
    directionCategoryFormItems,
    solutionFileFormItems,
    knowledgeBaseFormItems,
  };
};
