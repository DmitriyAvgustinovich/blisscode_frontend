import { Card, Collapse, Typography } from "antd";
import { Link } from "react-router-dom";

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
          title={knowledge.name}
        >
          <Card.Meta description={knowledge.description} />

          <Collapse
            className={styles.knowledgesListCollapseWrapper}
            bordered={false}
          >
            {knowledge?.topics?.map((topic) => (
              <Collapse.Panel key={topic.id} header={topic.name}>
                {topic.knowledge?.map((knowledge) => (
                  <Link key={knowledge.id} to={`?knowledgeId=${knowledge.id}`}>
                    <Typography.Text
                      className={styles.knowledgesListTitleInTopic}
                    >
                      {knowledge.title}
                    </Typography.Text>
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
