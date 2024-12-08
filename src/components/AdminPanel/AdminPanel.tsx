import { Tabs } from "antd";
import { useGetRenderedSolutionsFilesColumns } from "hooks";

import { AdminPanelTable } from "components/AdminPanelTable/AdminPanelTable";

import {
  useAddDirectionMutation,
  useDeleteDirectionMutation,
  useGetAllDirectionsQuery,
  useUpdateDirectionMutation,
} from "store/api/direction/direction-api";
import {
  useAddDirectionCategoryMutation,
  useDeleteDirectionCategoryMutation,
  useGetAllDirectionCategoriesQuery,
  useUpdateDirectionCategoryMutation,
} from "store/api/direction_category/direction-category-api";
import {
  useAddDirectionStackMutation,
  useDeleteDirectionStackMutation,
  useGetAllDirectionsStacksQuery,
  useUpdateDirectionStackMutation,
} from "store/api/direction_stack/direction-stack-api";
import {
  useAddSolutionFileMutation,
  useDeleteSolutionFileMutation,
  useGetAllSolutionsFilesQuery,
  useUpdateSolutionFileMutation,
} from "store/api/solution_file/solution-file-api";

import { directionCategoryColumns } from "constants/direction-category-constants";
import { directionColumns } from "constants/direction-constants";
import { solutionFilesColumns } from "constants/solution-files-constants";
import { stackColumns } from "constants/stack-constants";

import { useGetFormItemsForAdminPanel } from "hooks/admin/use-form-items-for-admin-panel";

import styles from "./AdminPanel.module.scss";

export const AdminPanel = () => {
  const { directionColumn, stackColumn, categoryColumn } =
    useGetRenderedSolutionsFilesColumns();

  const {
    directionFormItems,
    stackFormItems,
    directionCategoryFormItems,
    solutionFileFormItems,
  } = useGetFormItemsForAdminPanel();

  const tabItems = [
    {
      key: "1",
      label: "Решения",
      children: (
        <AdminPanelTable
          useGetAction={useGetAllSolutionsFilesQuery}
          useAddAction={useAddSolutionFileMutation}
          useUpdateAction={useUpdateSolutionFileMutation}
          useDeleteAction={useDeleteSolutionFileMutation}
          tableColumns={[
            ...solutionFilesColumns,
            directionColumn,
            stackColumn,
            categoryColumn,
          ]}
          formItems={solutionFileFormItems}
        />
      ),
    },
    {
      key: "2",
      label: "Направления",
      children: (
        <AdminPanelTable
          useGetAction={useGetAllDirectionsQuery}
          useAddAction={useAddDirectionMutation}
          useUpdateAction={useUpdateDirectionMutation}
          useDeleteAction={useDeleteDirectionMutation}
          tableColumns={directionColumns}
          formItems={directionFormItems}
        />
      ),
    },
    {
      key: "3",
      label: "Стеки",
      children: (
        <AdminPanelTable
          useGetAction={useGetAllDirectionsStacksQuery}
          useAddAction={useAddDirectionStackMutation}
          useUpdateAction={useUpdateDirectionStackMutation}
          useDeleteAction={useDeleteDirectionStackMutation}
          tableColumns={[...stackColumns, directionColumn]}
          formItems={stackFormItems}
        />
      ),
    },
    {
      key: "4",
      label: "Категории направлений",
      children: (
        <AdminPanelTable
          useGetAction={useGetAllDirectionCategoriesQuery}
          useAddAction={useAddDirectionCategoryMutation}
          useUpdateAction={useUpdateDirectionCategoryMutation}
          useDeleteAction={useDeleteDirectionCategoryMutation}
          tableColumns={[
            ...directionCategoryColumns,
            directionColumn,
            stackColumn,
          ]}
          formItems={directionCategoryFormItems}
        />
      ),
    },
  ];

  return (
    <div className={styles.adminPanelWrapper}>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};
