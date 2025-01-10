import { Typography } from "antd";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { IKnowledge } from "types";

import styles from "./Knowledge.module.scss";

interface IKnowledgeItemProps {
  knowledgeData: IKnowledge;
}

export const Knowledge = (props: IKnowledgeItemProps) => {
  const { knowledgeData } = props;

  return (
    <>
      <Typography.Title className={styles.knowledgeTitle} level={3}>
        {knowledgeData.title}
      </Typography.Title>

      <div className={styles.knowledgeContentWrapper}>
        <MarkdownViewer markdownContent={knowledgeData.text} />
      </div>
    </>
  );
};
