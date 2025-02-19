import { Card, Collapse, Typography } from "antd";
import { Link } from "react-router-dom";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { IDirectionKnowledge } from "types";

import styles from "./KnowledgesList.module.scss";

interface IKnowledgesListProps {
  knowledgesList: IDirectionKnowledge[];
}

export const KnowledgesList = (props: IKnowledgesListProps) => {
  const { knowledgesList } = props;

  return (
    <div className={styles.knowledgesListWrapper}>
      {knowledgesList?.map((knowledge) => (
        <Card
          className={styles.knowledgesListCardWrapper}
          key={knowledge.id}
          title={
            <TextWithLine
              elements={[<b>{knowledge.name}</b>]}
              isColumn={false}
            />
          }
        >
          <Typography.Text className={styles.knowledgesListText}>
            {knowledge.description}
          </Typography.Text>

          <Collapse
            className={styles.knowledgesListCollapseWrapper}
            bordered={false}
          >
            {knowledge?.topics?.map((topic) => (
              <Collapse.Panel key={topic.id} header={topic.name}>
                {topic.knowledge?.map((knowledge) => (
                  <Link key={knowledge.id} to={`?knowledgeId=${knowledge.id}`}>
                    <TextWithLine
                      elements={[knowledge.title]}
                      isColumn={false}
                    />
                  </Link>
                ))}
              </Collapse.Panel>
            ))}
          </Collapse>
        </Card>
      ))}
    </div>
  );
};
