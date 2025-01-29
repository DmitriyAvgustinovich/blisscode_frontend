import React from "react";

import { Form, Pagination, Input, Typography } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";
import { ITheoreticalTestingQuestion } from "types/ITheoreticalTestingQuestion";

import { LineOutlined } from "@ant-design/icons";

import { AdminEntityCardWrapper } from "components/AdminPanel/AdminEntityCardWrapper/AdminEntityCardWrapper";

import { useSearchTheoreticalQuestionsMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
  useUpdateQuestionMutation,
} from "store/api/theoretical_testing/theoretical-testing-api";
import { IGetAllQuestionsResponse } from "store/api/theoretical_testing/types";

import { PAGINATION_PAGE_SIZE } from "constants/theoretical-testing-constants";

import styles from "./TheoreticalTestingCard.module.scss";

export const TheoreticalTestingCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchResults, setSearchResults] =
    React.useState<IGetAllQuestionsResponse | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<ITheoreticalTestingQuestion | null>(null);

  const [form] = Form.useForm();

  const { data: allQuestionsData } = useGetAllQuestionsQuery({
    page: currentPage,
    pageSize: PAGINATION_PAGE_SIZE,
  });

  const { theoreticalTestingQuestionFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [deleteQuestion] = useDeleteQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [addQuestion] = useCreateQuestionMutation();
  const [searchQuestions] = useSearchTheoreticalQuestionsMutation();

  const handleSaveAction = async (entity: ITheoreticalTestingQuestion) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateQuestion(updateData).unwrap();
    } else {
      await addQuestion(entity).unwrap();
    }

    setIsModalOpen(false);
  };

  const handleSearchQuestions = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
      }

      const { data, totalCount } = await searchQuestions({
        searchQuery,
      }).unwrap();

      setSearchResults({ data, totalCount });
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (!searchResults) {
      setCurrentPage(page);
    }
  };

  const displayedData = searchResults || allQuestionsData;

  return (
    <AdminEntityCardWrapper<ITheoreticalTestingQuestion>
      cardTitle={`Теоретические вопросы (всего - ${
        displayedData?.totalCount ?? 0
      })`}
      dataForCard={displayedData?.data ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={editingEntity ? "Редактировать вопрос" : "Добавить вопрос"}
      entityFormItems={theoreticalTestingQuestionFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteQuestion(entity).unwrap()}
      setCurrentPage={setCurrentPage}
      renderCardContentTitle={(question) => (
        <>
          {question.id} <LineOutlined rotate={90} /> {question.name}
        </>
      )}
      renderCardContentDescription={(question) => <>{question.answer}</>}
      renderCustomHeader={() => (
        <Input.Search
          placeholder="Поиск вопросов..."
          onSearch={handleSearchQuestions}
          allowClear
          enterButton
        />
      )}
      renderCustomFooter={() => (
        <>
          {searchResults && searchResults?.totalCount < 1 && (
            <Typography.Text className={styles.theoreticalTestingCardEmptyText}>
              Вопросов не найдено, попробуйте еще раз
            </Typography.Text>
          )}

          {(displayedData?.totalCount ?? 0) > 0 && (
            <Pagination
              className={styles.theoreticalTestingCardPaginationWrapper}
              current={currentPage}
              total={displayedData?.totalCount}
              pageSize={PAGINATION_PAGE_SIZE}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    />
  );
};
