import React from "react";

import { Form, message } from "antd";
import {
  useContexts,
  useGetActiveUser,
  useGetFormItemsForAdminPanel,
} from "hooks";
import { Link } from "react-router-dom";

import { LineOutlined } from "@ant-design/icons";

import {
  useAddSolutionFileMutation,
  useDeleteSolutionFileMutation,
  useGetAllSolutionsFilesQuery,
  useUpdateSolutionFileMutation,
} from "store/api/solution_file/solution-file-api";

import { ISolutionFile } from "types";

import { AdminEntityCardWrapper } from "../AdminEntityCardWrapper/AdminEntityCardWrapper";

export const SolutionsFilesCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<ISolutionFile | null>(null);

  const [form] = Form.useForm();

  const { data: allSolutionsData } = useGetAllSolutionsFilesQuery();

  const { solutionFileFormItems } = useGetFormItemsForAdminPanel({
    solutionFileName:
      editingEntity && form.getFieldValue("file_path")?.slice(6),
    formState: form,
  });

  const { activeUserData } = useGetActiveUser();

  const [addSolution] = useAddSolutionFileMutation();
  const [updateSolution] = useUpdateSolutionFileMutation();
  const [deleteSolution] = useDeleteSolutionFileMutation();

  const {
    solutionFileCodeContext: { solutionFileName },
  } = useContexts();

  const handleSaveAction = async (entity: ISolutionFile) => {
    try {
      if (editingEntity) {
        const updateData = {
          ...entity,
          filename: solutionFileName || entity.file_path?.slice(6),
          id: editingEntity.id,
        };

        await updateSolution(updateData);
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

  // todo: добавить сюда поиск решений

  return (
    <AdminEntityCardWrapper<ISolutionFile>
      cardTitle={`Решения | ${allSolutionsData?.length ?? 0}`}
      dataForCard={allSolutionsData}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      form={form}
      modalTitle={editingEntity ? "Редактировать решение" : "Добавить решение"}
      entityFormItems={solutionFileFormItems}
      editingEntity={editingEntity}
      setEditingEntity={setEditingEntity}
      handleSaveAction={handleSaveAction}
      deleteEntity={async (entity) => await deleteSolution(entity).unwrap()}
      renderCardContentTitle={(dataItem) => (
        <>
          {dataItem.id} <LineOutlined rotate={90} /> {dataItem.name}
        </>
      )}
      renderCardContentDescription={(dataItem) => (
        <>
          {dataItem.description}
          <br />
          {dataItem.file_path}
          <br />
          <Link
            // todo: вписать продакшн версию
            to={`http://127.0.0.1:5173/solutions_files?directionId=${dataItem.direction_id}&stackId=${dataItem.stack_id}&categoryId=${dataItem.direction_category_id}&authUserId=${activeUserData?.hashedTelegramId}`}
            target="_blank"
            style={{ color: "var(--purple-text-color)" }}
          >
            Смотреть решения по данным параметрам
          </Link>
        </>
      )}
    />
  );
};
