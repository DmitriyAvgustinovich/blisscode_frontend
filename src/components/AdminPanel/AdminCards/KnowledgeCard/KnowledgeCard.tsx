import React from "react";

import { Button, Form, Input, Pagination, Typography } from "antd";
import { useGetActiveUser, useGetFormItemsForAdminPanel } from "hooks";

import { EyeOutlined, LineOutlined } from "@ant-design/icons";

import { AdminEntityCardWrapper } from "components/AdminPanel/AdminEntityCardWrapper/AdminEntityCardWrapper";
import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { useSearchKnowledgesMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useAddKnowledgeMutation,
  useDeleteKnowledgeMutation,
  useGetAllKnowledgesQuery,
  useUpdateKnowledgeMutation,
} from "store/knowledge-base/knowledge-base.api";
import { IGetAllKnowledgesResponse } from "store/knowledge-base/types";

import { RouterPath } from "configs/route-config";

import { PRODUCTION_FRONTEND_URL } from "constants/general-constants";
import { PAGINATION_PAGE_SIZE } from "constants/knowledge-base-constants";

import { IKnowledge } from "types";

import styles from "./KnowledgeCard.module.scss";

export const KnowledgeCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchResults, setSearchResults] =
    React.useState<IGetAllKnowledgesResponse | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] = React.useState<IKnowledge | null>(
    null
  );

  const [form] = Form.useForm();

  const { activeUserData } = useGetActiveUser();

  const { data: allKnowledgeData } = useGetAllKnowledgesQuery({
    page: currentPage,
    pageSize: PAGINATION_PAGE_SIZE,
  });

  const { knowledgeBaseFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addKnowledge] = useAddKnowledgeMutation();
  const [updateKnowledge] = useUpdateKnowledgeMutation();
  const [deleteKnowledge] = useDeleteKnowledgeMutation();

  const [searchKnowledge] = useSearchKnowledgesMutation();

  const handleSaveAction = async (entity: IKnowledge) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateKnowledge(updateData);
    } else {
      await addKnowledge(entity);
    }

    setIsModalOpen(false);
  };

  const handleSearchKnowledge = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
      }

      const { data, totalCount } = await searchKnowledge({
        searchQuery,
      }).unwrap();

      setSearchResults({ data, totalCount });
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  const displayedData = searchResults || allKnowledgeData;

  const onPageChange = (currentPage: number) => {
    if (!searchResults) {
      setCurrentPage(currentPage);
    }
  };

  return (
    <AdminEntityCardWrapper<IKnowledge>
      cardTitle={`База знаний (всего - ${displayedData?.totalCount ?? 0})`}
      dataForCard={displayedData?.data ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={editingEntity ? "Редактировать знание" : "Добавить знание"}
      entityFormItems={knowledgeBaseFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteKnowledge(entity).unwrap()}
      setCurrentPage={setCurrentPage}
      customStylesForModal={{ minWidth: "70%" }}
      renderCardContentTitle={(knowledge) => (
        <>
          {knowledge.id} <LineOutlined rotate={90} /> {knowledge.title}{" "}
          <LineOutlined rotate={90} /> {knowledge.type}
        </>
      )}
      renderCardContentDescription={(knowledge) => (
        <>
          <MarkdownViewer markdownContent={knowledge.text} />

          <Button
            className={styles.knowledgeCardButton}
            type="primary"
            size="small"
            href={`${PRODUCTION_FRONTEND_URL}${RouterPath.knowledge_base}?knowledgeId=${knowledge.id}&authUserId=${activeUserData?.hashedTelegramId}`}
            target="_blank"
            icon={<EyeOutlined />}
          >
            Смотреть знание
          </Button>
        </>
      )}
      renderCustomHeader={() => (
        <Input.Search
          placeholder="Поиск знаний..."
          onSearch={handleSearchKnowledge}
          allowClear
        />
      )}
      renderCustomFooter={() => (
        <>
          {searchResults && searchResults?.totalCount < 1 && (
            <Typography.Text className={styles.knowledgeCardEmptyText}>
              Знаний не найдено. Попробуйте еще раз.
            </Typography.Text>
          )}

          {(displayedData?.totalCount ?? 0) > 0 && !searchResults && (
            <Pagination
              className={styles.knowledgeCardPaginationWrapper}
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
