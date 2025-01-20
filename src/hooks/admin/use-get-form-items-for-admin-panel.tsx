import React from "react";

import { FormInstance, Input, Select } from "antd";

import { UploadZipSolutionFileButton } from "components/AdminPanel/UploadZipSolutionFileButton/UploadZipSolutionFileButton";
import { MarkdownEditor } from "components/MarkdownEditor/MarkdownEditor";

import { useGetAllDirectionsQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoriesByDirectionIdAndStackIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStacksByDirectionIdQuery } from "store/api/direction_stack/direction-stack-api";
import {
  useGetAllDirectionKnowledgesQuery,
  useGetAllDirectionTopicsKnowledgeQuery,
} from "store/knowledge-base/knowledge-base.api";

import {
  directionCategoryTableDataIndexes,
  directionCategoryTableLabels,
} from "constants/direction-category-constants";
import {
  directionTableDataIndexes,
  directionTableLabels,
} from "constants/direction-constants";
import {
  directionKnowledgeDataIndexes,
  directionKnowledgeLabels,
  directionTopicKnowledgeDataIndexes,
  directionTopicKnowledgeLabels,
  knowledgeDataIndexes,
  knowledgeLabels,
} from "constants/knowledge-base-constants";
import {
  solutionFilesDataIndexes,
  solutionFilesLabels,
} from "constants/solution-files-constants";
import {
  stackTableDataIndexes,
  stackTableLabels,
} from "constants/stack-constants";

import { getSelectOptions } from "utils";

import {
  ETypesKnowledge,
  IDirection,
  IDirectionCategory,
  IDirectionKnowledge,
  IDirectionStack,
} from "types";

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

  const { data: allDirectionKnowledgeData } =
    useGetAllDirectionKnowledgesQuery();

  const { data: allDirectionTopicsKnowledgeData } =
    useGetAllDirectionTopicsKnowledgeQuery();

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
      node: (
        <Select
          options={getSelectOptions<IDirection>(allDirectionsData ?? [])}
        />
      ),
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
          options={getSelectOptions<IDirection>(allDirectionsData ?? [])}
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
          options={getSelectOptions<IDirectionStack>(
            stacksByDirectionIdData ?? []
          )}
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
          options={getSelectOptions<IDirection>(allDirectionsData ?? [])}
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
          options={getSelectOptions<IDirectionStack>(
            stacksByDirectionIdData ?? []
          )}
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
          options={getSelectOptions<IDirectionCategory>(
            categoriesByDirectionIdAndStackIdData ?? []
          )}
          disabled={!selectedDirectionId || !selectedStackId}
        />
      ),
    },
  ];

  const knowledgeTypesOptions = [
    {
      label: "Ссылка",
      value: ETypesKnowledge.LINK,
    },
    {
      label: "Текст",
      value: ETypesKnowledge.TEXT,
    },
    {
      label: "Конспект",
      value: ETypesKnowledge.ABSTRACT,
    },
  ];

  const knowledgeFormItems = [
    {
      label: knowledgeLabels.title,
      name: knowledgeDataIndexes.title,
      node: <Input />,
    },
    {
      label: knowledgeLabels.text,
      name: knowledgeDataIndexes.text,
      node: (
        <MarkdownEditor
          formState={formState}
          fieldDataIndex={knowledgeDataIndexes.text}
        />
      ),
    },
    {
      label: knowledgeLabels.type,
      name: knowledgeDataIndexes.type,
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
            label: knowledgeLabels.link,
            name: knowledgeDataIndexes.link,
            node: <Input />,
          },
        ]
      : []),
    {
      label: knowledgeLabels.directionKnowledge,
      name: knowledgeDataIndexes.directionKnowledge,
      node: (
        <Select
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={getSelectOptions<IDirectionKnowledge>(
            allDirectionKnowledgeData ?? []
          )}
        />
      ),
    },
    {
      label: knowledgeLabels.directionTopicKnowledge,
      name: knowledgeDataIndexes.directionKnowledgeTopic,
      node: (
        <Select
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={getSelectOptions<IDirectionKnowledge>(
            allDirectionTopicsKnowledgeData ?? []
          )}
        />
      ),
    },
  ];

  const directionKnowledgeFormItems = [
    {
      label: directionKnowledgeLabels.name,
      name: directionKnowledgeDataIndexes.name,
      node: <Input />,
    },
    {
      label: directionKnowledgeLabels.description,
      name: directionKnowledgeDataIndexes.description,
      node: (
        <MarkdownEditor
          formState={formState}
          fieldDataIndex={directionKnowledgeDataIndexes.description}
        />
      ),
    },
  ];

  const directionTopicKnowledgeFormItems = [
    {
      label: directionTopicKnowledgeLabels.name,
      name: directionTopicKnowledgeDataIndexes.name,
      node: <Input />,
    },
    {
      label: directionTopicKnowledgeLabels.directionKnowledge,
      name: directionTopicKnowledgeDataIndexes.directionKnowledge,
      node: (
        <Select
          options={getSelectOptions<IDirectionKnowledge>(
            allDirectionKnowledgeData ?? []
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
    directionKnowledgeFormItems,
    directionTopicKnowledgeFormItems,
    knowledgeFormItems,
  };
};
