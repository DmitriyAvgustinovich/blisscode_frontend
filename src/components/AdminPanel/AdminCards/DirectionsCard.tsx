import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { LineOutlined } from "@ant-design/icons";

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
      cardTitle="Направления"
      dataForCard={allDirectionsData}
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
        <>
          {direction.id} <LineOutlined rotate={90} /> {direction.name}{" "}
          <LineOutlined rotate={90} /> {direction.tg_callback_data}
        </>
      )}
    />
  );
};
