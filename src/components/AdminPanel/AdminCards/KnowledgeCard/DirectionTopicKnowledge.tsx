import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { AdminEntityCardWrapper } from "components/AdminPanel/AdminEntityCardWrapper/AdminEntityCardWrapper";
import { TextWithLine } from "components/TextWithLine/TextWithLine";

import {
  useAddDirectionTopicKnowledgeMutation,
  useDeleteDirectionTopicKnowledgeMutation,
  useGetAllDirectionTopicsKnowledgeQuery,
  useUpdateDirectionTopicKnowledgeMutation,
} from "store/api/knowledge_base/knowledge-base.api";

import { IDirectionTopicKnowledge } from "types";

export const DirectionTopicKnowledge = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<IDirectionTopicKnowledge | null>(null);

  const [form] = Form.useForm();

  const { data: allDirectionTopicKnowledgesData } =
    useGetAllDirectionTopicsKnowledgeQuery();

  const { directionTopicKnowledgeFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addDirectionTopicKnowledge] = useAddDirectionTopicKnowledgeMutation();

  const [updateDirectionTopicKnowledge] =
    useUpdateDirectionTopicKnowledgeMutation();

  const [deleteDirectionTopicKnowledge] =
    useDeleteDirectionTopicKnowledgeMutation();

  const handleSaveAction = async (entity: IDirectionTopicKnowledge) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateDirectionTopicKnowledge(updateData);
    } else {
      await addDirectionTopicKnowledge(entity);
    }

    setIsModalOpen(false);
  };

  return (
    <AdminEntityCardWrapper<IDirectionTopicKnowledge>
      cardTitle={`Топики направлений знаний (всего - ${
        allDirectionTopicKnowledgesData?.length ?? 0
      })`}
      dataForCard={allDirectionTopicKnowledgesData ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={
        editingEntity
          ? "Редактировать топик направления"
          : "Добавить топик направления"
      }
      entityFormItems={directionTopicKnowledgeFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) =>
        await deleteDirectionTopicKnowledge(entity).unwrap()
      }
      renderCardContentTitle={(directionTopicKnowledge) => (
        <TextWithLine
          elements={[
            <>
              Идентификатор: <b>{directionTopicKnowledge.id}</b>
            </>,
            <>
              Название: <b>{directionTopicKnowledge.name}</b>
            </>,
          ]}
        />
      )}
    />
  );
};
