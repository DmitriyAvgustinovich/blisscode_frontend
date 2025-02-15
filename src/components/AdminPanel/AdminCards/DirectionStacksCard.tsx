import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import {
  useAddDirectionStackMutation,
  useDeleteDirectionStackMutation,
  useGetAllDirectionsStacksQuery,
  useUpdateDirectionStackMutation,
} from "store/api/direction_stack/direction-stack-api";

import { IDirectionStack } from "types";

import { AdminEntityCardWrapper } from "../AdminEntityCardWrapper/AdminEntityCardWrapper";

export const DirectionStacksCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<IDirectionStack | null>(null);

  const [form] = Form.useForm();

  const { data: allStacksData } = useGetAllDirectionsStacksQuery();

  const { directionStackFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addStack] = useAddDirectionStackMutation();
  const [updateStack] = useUpdateDirectionStackMutation();
  const [deleteStack] = useDeleteDirectionStackMutation();

  const handleSaveAction = async (entity: IDirectionStack) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateStack(updateData);
    } else {
      await addStack(entity);
    }

    setIsModalOpen(false);
  };

  return (
    <AdminEntityCardWrapper<IDirectionStack>
      cardTitle={`Стеки (всего - ${allStacksData?.length ?? 0})`}
      dataForCard={allStacksData ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={editingEntity ? "Редактировать стек" : "Добавить стек"}
      entityFormItems={directionStackFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteStack(entity).unwrap()}
      renderCardContentTitle={(stack) => (
        <TextWithLine
          elements={[
            <>
              Идентификатор: <b>{stack.id}</b>
            </>,
            <>
              Название: <b>{stack.name}</b>
            </>,
            <>
              Callback_data: <b>{stack.tgCallbackData}</b>
            </>,
          ]}
        />
      )}
    />
  );
};
