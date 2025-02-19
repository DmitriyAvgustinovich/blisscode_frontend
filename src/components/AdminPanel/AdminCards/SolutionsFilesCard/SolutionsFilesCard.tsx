import React from "react";

import { Button, Form, Input, message, Pagination, Typography } from "antd";
import {
  useContexts,
  useGetActiveUser,
  useGetFormItemsForAdminPanel,
} from "hooks";

import { EyeOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";
import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { useSearchSolutionFilesMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useAddSolutionFileMutation,
  useDeleteSolutionFileMutation,
  useGetAllSolutionsFilesQuery,
  useUpdateSolutionFileMutation,
} from "store/api/solution_file/solution-file-api";
import { IGetAllSolutionsFilesResponse } from "store/api/solution_file/types";

import { RouterPath } from "configs/route-config";

import {
  PAGINATION_PAGE_SIZE,
  solutionFilesDataIndexes,
  SOLUTIONS_FILES_FOLDER_PREFIX,
} from "constants/solution-files-constants";

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
      editingEntity &&
      form
        .getFieldValue(solutionFilesDataIndexes.filePath)
        ?.slice(SOLUTIONS_FILES_FOLDER_PREFIX.length + 1),
    formState: form,
  });

  const { activeUserData } = useGetActiveUser();

  const [addSolution] = useAddSolutionFileMutation();
  const [updateSolution] = useUpdateSolutionFileMutation();
  const [deleteSolution] = useDeleteSolutionFileMutation();

  const [searchSolutionFiles] = useSearchSolutionFilesMutation();

  const {
    solutionFileCodeContext: { solutionFileName, setSolutionFileName },
  } = useContexts();

  const handleSaveAction = async (entity: ISolutionFile) => {
    try {
      if (editingEntity) {
        const updateData = {
          ...entity,
          filename:
            solutionFileName ||
            entity.filePath?.slice(SOLUTIONS_FILES_FOLDER_PREFIX.length + 1),
          id: editingEntity.id,
        };

        await updateSolution(updateData).unwrap();
      } else {
        const createData = { ...entity, filename: solutionFileName };
        await addSolution(createData).unwrap();

        form.resetFields();
        setSolutionFileName("");
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

  const handleChangePage = (currentPage: number) => {
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
      renderCardContentTitle={(solutionFile) => (
        <TextWithLine
          elements={[
            <>
              Идентификатор: <b>{solutionFile.id}</b>
            </>,
            <>
              Название: <b>{solutionFile.name}</b>
            </>,
            <>
              Путь до файла: <b>{solutionFile.filePath}</b>
            </>,
          ]}
        />
      )}
      renderCardContentDescription={(solutionFile) => (
        <>
          <MarkdownViewer markdownContent={solutionFile.description} />

          <Button
            className={styles.solutionsFilesCardLinkButton}
            type="primary"
            size="small"
            href={`${RouterPath.displayed_solutions_files_list}?directionId=${solutionFile.directionId}&stackId=${solutionFile.stackId}&categoryId=${solutionFile.directionCategoryId}&authUserId=${activeUserData?.hashedTelegramId}`}
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
          enterButton
        />
      )}
      renderCustomFooter={() => (
        <>
          {searchResults && searchResults?.totalCount < 1 && (
            <Typography.Text className={styles.solutionsFilesCardEmptyText}>
              Решений не найдено, попробуйте еще раз
            </Typography.Text>
          )}

          {(displayedData?.totalCount ?? 0) > 0 && !searchResults && (
            <Pagination
              className={styles.solutionsFilesCardPaginationWrapper}
              current={currentPage}
              total={displayedData?.totalCount}
              pageSize={PAGINATION_PAGE_SIZE}
              onChange={handleChangePage}
            />
          )}
        </>
      )}
    />
  );
};
