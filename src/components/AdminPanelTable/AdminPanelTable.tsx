import React from "react";

import {
  Button,
  Form,
  Modal,
  Table,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { useContexts } from "hooks";

import { getValidationRules } from "utils";

import { IFormItem, TRecordStringObject } from "types";

import styles from "./AdminPanelTable.module.scss";

interface IAdminPanelTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useGetAction: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAddAction: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useUpdateAction: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDeleteAction: () => any;
  tableColumns: TRecordStringObject[];
  formItems: IFormItem[];
}

export const AdminPanelTable = (props: IAdminPanelTableProps) => {
  const {
    useGetAction,
    useAddAction,
    useUpdateAction,
    useDeleteAction,
    tableColumns,
    formItems,
  } = props;

  const { data: entityData } = useGetAction();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [editingEntity, setEditingEntity] =
    React.useState<TRecordStringObject | null>(null);

  const [form] = Form.useForm();

  const [addEntity] = useAddAction();
  const [updateEntity] = useUpdateAction();
  const [deleteEntity] = useDeleteAction();

  const {
    solutionFileCodeContext: { solutionFileName },
  } = useContexts();

  const handleAddEntity = () => {
    form.resetFields();
    setEditingEntity(null);
    setIsModalOpen(true);
  };

  const handleEditEntity = (entity: TRecordStringObject) => {
    setEditingEntity(entity);
    form.setFieldsValue(entity);
    setIsModalOpen(true);
  };

  const handleSaveEntity = async (entity: TRecordStringObject) => {
    try {
      if (editingEntity) {
        await updateEntity({
          ...entity,
          id: editingEntity.id,
          filename: solutionFileName || entity.file_path.slice(6),
        });
      } else {
        await addEntity({ ...entity, filename: solutionFileName });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEntity = async (entity: TRecordStringObject) => {
    try {
      const response = await deleteEntity(entity);

      if (response?.error) {
        message.error(response.error.data.message);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const columns = [
    ...tableColumns,
    {
      title: "Действия",
      key: "actions",
      render: (_: unknown, record: TRecordStringObject) => (
        <div className={styles.adminPanelTableActionsWrapper}>
          <Typography.Text
            className={styles.adminPanelTableActionText}
            onClick={() => handleEditEntity(record)}
          >
            Редактировать
          </Typography.Text>

          <Popconfirm
            title="Удаление"
            description="Вы уверены, что хотите удалить данную запись?"
            onConfirm={() => handleDeleteEntity(record)}
            okText="Да"
            cancelText="Нет"
          >
            <Typography.Text className={styles.adminPanelTableActionText}>
              Удалить
            </Typography.Text>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        className={styles.adminPanelTableAddButton}
        type="primary"
        onClick={handleAddEntity}
      >
        Добавить
      </Button>

      <Table
        className={styles.adminPanelTableEmptyTableText}
        columns={columns}
        dataSource={entityData}
        pagination={{
          position: ["bottomCenter"],
        }}
        locale={{
          emptyText: "Нет данных",
        }}
      />

      <Modal
        title={editingEntity ? "Редактировать" : "Добавить"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveEntity} layout="vertical">
          {formItems?.map((formItem) => (
            <Form.Item
              {...formItem}
              key={formItem.name}
              rules={getValidationRules({ formItem, editingEntity })}
            >
              {formItem.node}
            </Form.Item>
          ))}

          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </Form>
      </Modal>
    </>
  );
};
