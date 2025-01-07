import { Button, Card, Form, FormInstance, message, Modal } from "antd";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { getValidationRules } from "utils";

import { IFormItem } from "types";

import styles from "./AdminEntityCardWrapper.module.scss";

interface IAdminEntityCardWrapperProps<T> {
  cardTitle: string;
  dataForCard: T[];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  form: FormInstance;
  modalTitle: string;
  entityFormItems: IFormItem[];
  editingEntity: T | null;
  setEditingEntity: (editingEntity: T | null) => void;
  handleSaveAction: (entity: T) => Promise<void>;
  deleteEntity: (entity: T) => Promise<void>;
  setCurrentPage?: (page: number) => void;
  renderCardContentTitle: (dataItem: T) => React.ReactNode;
  renderCardContentDescription?: (dataItem: T) => React.ReactNode;
  renderCustomHeader?: () => React.ReactNode;
  renderCustomFooter?: () => React.ReactNode;
}

export const AdminEntityCardWrapper = <T extends { id: number }>(
  props: IAdminEntityCardWrapperProps<T>
) => {
  const {
    cardTitle,
    dataForCard,
    isModalOpen,
    setIsModalOpen,
    form,
    modalTitle,
    entityFormItems,
    editingEntity,
    setEditingEntity,
    handleSaveAction,
    deleteEntity,
    setCurrentPage,
    renderCardContentTitle,
    renderCardContentDescription,
    renderCustomHeader,
    renderCustomFooter,
  } = props;

  const handleAddAction = () => {
    form.resetFields();
    setEditingEntity(null);
    setIsModalOpen(true);
  };

  const handleUpdateAction = (entity: T) => {
    setEditingEntity(entity);
    form.setFieldsValue(entity);
    setIsModalOpen(true);
  };

  const handleDeleteAction = async (entity: T) => {
    try {
      await deleteEntity(entity);
      setCurrentPage?.(1);
    } catch (error) {
      message.error((error as { data: { message: string } }).data.message);
    }
  };

  return (
    <>
      <Card className={styles.adminEntityCardWrapper}>
        <Card.Meta title={cardTitle} />

        <div className={styles.adminEntityCardHeaderWrapper}>
          <Button
            type="primary"
            onClick={handleAddAction}
            icon={<PlusOutlined />}
          >
            Добавить
          </Button>

          {renderCustomHeader && renderCustomHeader()}
        </div>

        <div className={styles.adminEntityCardItemsWrapper}>
          {dataForCard?.map((dataItem) => (
            <Card
              key={dataItem.id}
              actions={[
                <EditOutlined onClick={() => handleUpdateAction(dataItem)} />,
                <DeleteOutlined onClick={() => handleDeleteAction(dataItem)} />,
              ]}
            >
              <Card.Meta
                title={renderCardContentTitle(dataItem)}
                description={renderCardContentDescription?.(dataItem)}
              />
            </Card>
          ))}
        </div>

        {renderCustomFooter && renderCustomFooter()}
      </Card>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          className={styles.adminEntityCardFormWrapper}
          form={form}
          onFinish={handleSaveAction}
          layout="vertical"
        >
          {entityFormItems?.map((formItem) => (
            <Form.Item
              {...formItem}
              key={formItem.name}
              rules={getValidationRules<T | null>({
                formItem,
                editingEntity,
              })}
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
