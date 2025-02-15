import React from "react";

import { Form } from "antd";
import { useGetFormItemsForAdminPanel } from "hooks";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import {
  useAddDirectionCategoryMutation,
  useDeleteDirectionCategoryMutation,
  useGetAllDirectionCategoriesQuery,
  useUpdateDirectionCategoryMutation,
} from "store/api/direction_category/direction-category-api";

import { IDirectionCategory } from "types";

import { AdminEntityCardWrapper } from "../AdminEntityCardWrapper/AdminEntityCardWrapper";

export const DirectionCategoriesCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<IDirectionCategory | null>(null);

  const [form] = Form.useForm();

  const { data: allCategoriesData } = useGetAllDirectionCategoriesQuery();

  const { directionCategoryFormItems } = useGetFormItemsForAdminPanel({
    formState: form,
  });

  const [addCategory] = useAddDirectionCategoryMutation();
  const [updateCategory] = useUpdateDirectionCategoryMutation();
  const [deleteCategory] = useDeleteDirectionCategoryMutation();

  const handleSaveAction = async (entity: IDirectionCategory) => {
    if (editingEntity) {
      const updateData = {
        ...entity,
        id: editingEntity.id,
      };

      await updateCategory(updateData);
    } else {
      await addCategory(entity);
    }

    setIsModalOpen(false);
  };

  return (
    <AdminEntityCardWrapper<IDirectionCategory>
      cardTitle={`Категории направления (всего - ${
        allCategoriesData?.length ?? 0
      })`}
      dataForCard={allCategoriesData ?? []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={
        editingEntity
          ? "Редактировать категорию направления"
          : "Добавить категорию направления"
      }
      entityFormItems={directionCategoryFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteCategory(entity).unwrap()}
      renderCardContentTitle={(category) => (
        <TextWithLine
          elements={[
            <>
              Идентификатор: <b>{category.id}</b>
            </>,
            <>
              Название: <b>{category.name}</b>
            </>,
            <>
              Callback_data: <b>{category.tgCallbackData}</b>
            </>,
          ]}
        />
      )}
    />
  );
};
