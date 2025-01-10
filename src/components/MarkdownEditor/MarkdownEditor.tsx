import MDEditor from "@uiw/react-md-editor";
import { Collapse, FormInstance } from "antd";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import styles from "./MarkdownEditor.module.scss";

interface IMarkdownEditorPorps {
  formState: FormInstance;
  fieldDataIndex: string;
}

export const MarkdownEditor = (props: IMarkdownEditorPorps) => {
  const { formState, fieldDataIndex } = props;

  const knowledgeContent = formState.getFieldValue(fieldDataIndex);

  const collapseItems = [
    {
      key: "1",
      label: "Предпросмотр",
      children: <MarkdownViewer markdownContent={knowledgeContent} />,
    },
  ];

  return (
    <>
      <MDEditor
        className={styles.markdownEditorWpapper}
        value={knowledgeContent}
        onChange={(value) => formState.setFieldValue(fieldDataIndex, value)}
        height={500}
        highlightEnable
        toolbarBottom={false}
        preview="edit"
        textareaProps={{ placeholder: "Введите..." }}
      />

      <Collapse
        className={styles.markdownEditorCollapseWrapper}
        items={collapseItems}
        defaultActiveKey="1"
      />
    </>
  );
};
