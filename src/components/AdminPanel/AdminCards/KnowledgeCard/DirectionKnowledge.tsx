import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { LineOutlined } from "@ant-design/icons";

import { AdminEntityCardWrapper } from "components/AdminPanel/AdminEntityCardWrapper/AdminEntityCardWrapper";
import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import {
  useAddDirectionKnowledgeMutation,
  useDeleteDirectionKnowledgeMutation,
  useGetAllDirectionKnowledgesQuery,
  useUpdateDirectionKnowledgeMutation,
} from "store/api/knowledge_base/knowledge-base.api";

import { IDirectionKnowledge } from "types";

export const DirectionKnowledge = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<IDirectionKnowledge | null>(null);

  const [form] = Form.useForm();

  const { data: allDirectionKnowledgesData } =
    useGetAllDirectionKnowledgesQuery();

  const { directionKnowledgeFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addDirectionKnowledge] = useAddDirectionKnowledgeMutation();
  const [updateDirectionKnowledge] = useUpdateDirectionKnowledgeMutation();
  const [deleteDirectionKnowledge] = useDeleteDirectionKnowledgeMutation();

  const handleSaveAction = async (entity: IDirectionKnowledge) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateDirectionKnowledge(updateData);
    } else {
      await addDirectionKnowledge(entity);
    }

    setIsModalOpen(false);
  };

  return (
    <AdminEntityCardWrapper<IDirectionKnowledge>
      cardTitle={`Направления знаний (всего - ${
        allDirectionKnowledgesData?.length ?? 0
      })`}
      dataForCard={allDirectionKnowledgesData ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={
        editingEntity
          ? "Редактировать направление знания"
          : "Добавить направление знания"
      }
      entityFormItems={directionKnowledgeFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) =>
        await deleteDirectionKnowledge(entity).unwrap()
      }
      renderCardContentTitle={(directionKnowledge) => (
        <>
          {directionKnowledge.id} <LineOutlined rotate={90} />{" "}
          {directionKnowledge.name}
        </>
      )}
      renderCardContentDescription={(directionKnowledge) => (
        <MarkdownViewer
          markdownContent={directionKnowledge.description ?? ""}
        />
      )}
    />
  );
};
