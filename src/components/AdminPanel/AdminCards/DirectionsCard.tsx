import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import {
  useAddDirectionMutation,
  useDeleteDirectionMutation,
  useGetAllDirectionsQuery,
  useUpdateDirectionMutation,
} from "store/api/direction/direction-api";

import { IDirection } from "types";

import { AdminEntityCardWrapper } from "../AdminEntityCardWrapper/AdminEntityCardWrapper";

export const DirectionsCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] = React.useState<IDirection | null>(
    null
  );

  const [form] = Form.useForm();

  const { data: allDirectionsData } = useGetAllDirectionsQuery();

  const { directionFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addDirection] = useAddDirectionMutation();
  const [updateDirection] = useUpdateDirectionMutation();
  const [deleteDirection] = useDeleteDirectionMutation();

  const handleSaveAction = async (entity: IDirection) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateDirection(updateData);
    } else {
      await addDirection(entity);
    }

    setIsModalOpen(false);
  };

  return (
    <AdminEntityCardWrapper<IDirection>
      cardTitle={`Направления (всего - ${allDirectionsData?.length ?? 0})`}
      dataForCard={allDirectionsData ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={
        editingEntity ? "Редактировать направление" : "Добавить направление"
      }
      entityFormItems={directionFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteDirection(entity).unwrap()}
      renderCardContentTitle={(direction) => (
        <TextWithLine
          elements={[
            <>
              Идентификатор: <b>{direction.id}</b>
            </>,
            <>
              Название: <b>{direction.name}</b>
            </>,
            <>
              Callback_data: <b>{direction.tgCallbackData}</b>
            </>,
          ]}
        />
      )}
    />
  );
};
