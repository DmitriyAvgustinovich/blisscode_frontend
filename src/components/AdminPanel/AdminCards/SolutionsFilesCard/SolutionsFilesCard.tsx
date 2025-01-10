import React from "react";

import { Button, Form, Input, message, Pagination, Typography } from "antd";
import {
  useContexts,
  useGetActiveUser,
  useGetFormItemsForAdminPanel,
} from "hooks";

import { EyeOutlined, LineOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { useSearchSolutionFilesMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useAddSolutionFileMutation,
  useDeleteSolutionFileMutation,
  useGetAllSolutionsFilesQuery,
  useUpdateSolutionFileMutation,
} from "store/api/solution_file/solution-file-api";
import { IGetAllSolutionsFilesResponse } from "store/api/solution_file/types";

import { RouterPath } from "configs/route-config";

import { PRODUCTION_FRONTEND_URL } from "constants/general-constants";
import { PAGINATION_PAGE_SIZE } from "constants/solution-files-constants";

import { ISolutionFile } from "types";

import styles from "./SolutionsFilesCard.module.scss";
import { AdminEntityCardWrapper } from "../../AdminEntityCardWrapper/AdminEntityCardWrapper";

export const SolutionsFilesCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchResults, setSearchResults] =
    React.useState<IGetAllSolutionsFilesResponse | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<ISolutionFile | null>(null);

  const [form] = Form.useForm();

  const { data: allSolutionsData } = useGetAllSolutionsFilesQuery({
    page: currentPage,
    pageSize: PAGINATION_PAGE_SIZE,
  });

  const { solutionFileFormItems } = useGetFormItemsForAdminPanel({
    solutionFileName:
      // todo: скорее всего slice будет потом не нужен
      editingEntity && form.getFieldValue("file_path")?.slice(6),
    formState: form,
  });

  const { activeUserData } = useGetActiveUser();

  const [addSolution] = useAddSolutionFileMutation();
  const [updateSolution] = useUpdateSolutionFileMutation();
  const [deleteSolution] = useDeleteSolutionFileMutation();

  const [searchSolutionFiles] = useSearchSolutionFilesMutation();

  const {
    solutionFileCodeContext: { solutionFileName },
  } = useContexts();

  const handleSaveAction = async (entity: ISolutionFile) => {
    try {
      if (editingEntity) {
        const updateData = {
          ...entity,
          // todo: скорее всего slice будет потом не нужен
          filename: solutionFileName || entity.file_path?.slice(6),
          id: editingEntity.id,
        };

        await updateSolution(updateData).unwrap();
      } else {
        const createData = { ...entity, filename: solutionFileName };
        await addSolution(createData).unwrap();
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error((error as { data: { message: string } }).data.message);
    }
  };

  const handleSearchSolutionsFiles = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
      }

      const { data, totalCount } = await searchSolutionFiles({
        searchQuery,
      }).unwrap();

      setSearchResults({ data, totalCount });
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  const displayedData = searchResults || allSolutionsData;

  const onPageChange = (currentPage: number) => {
    if (!searchResults) {
      setCurrentPage(currentPage);
    }
  };

  return (
    <AdminEntityCardWrapper<ISolutionFile>
      cardTitle={`Решения (всего - ${displayedData?.totalCount ?? 0})`}
      dataForCard={displayedData?.data ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={editingEntity ? "Редактировать решение" : "Добавить решение"}
      entityFormItems={solutionFileFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteSolution(entity).unwrap()}
      setCurrentPage={setCurrentPage}
      renderCardContentTitle={(dataItem) => (
        <>
          {dataItem.id} <LineOutlined rotate={90} /> {dataItem.name}
        </>
      )}
      renderCardContentDescription={(dataItem) => (
        <>
          {dataItem.file_path}
          <MarkdownViewer markdownContent={dataItem.description} />

          <Button
            className={styles.solutionsFilesCardLinkButton}
            type="primary"
            size="small"
            href={`${PRODUCTION_FRONTEND_URL}${RouterPath.displayed_solutions_files_list}?directionId=${dataItem.direction_id}&stackId=${dataItem.stack_id}&categoryId=${dataItem.direction_category_id}&authUserId=${activeUserData?.hashedTelegramId}`}
            target="_blank"
            icon={<EyeOutlined />}
          >
            Смотреть решения
          </Button>
        </>
      )}
      renderCustomHeader={() => (
        <Input.Search
          placeholder="Поиск решений..."
          onSearch={handleSearchSolutionsFiles}
          allowClear
        />
      )}
      renderCustomFooter={() => (
        <>
          {searchResults && searchResults?.totalCount < 1 && (
            <Typography.Text className={styles.solutionsFilesCardEmptyText}>
              Решений не найдено. Попробуйте еще раз.
            </Typography.Text>
          )}

          {(displayedData?.totalCount ?? 0) > 0 && !searchResults && (
            <Pagination
              className={styles.solutionsFilesCardPaginationWrapper}
              current={currentPage}
              total={displayedData?.totalCount}
              pageSize={PAGINATION_PAGE_SIZE}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    />
  );
};
