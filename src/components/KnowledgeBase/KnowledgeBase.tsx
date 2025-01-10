import { Input, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { useGetKnowledgeByIdQuery } from "store/knowledge-base/knowledge-base.api";

import { EmptyKnowledge } from "./EmptyKnowledge/EmptyKnowledge";
import { Knowledge } from "./Knowledge/Knowledge";
import styles from "./KnowledgeBase.module.scss";

export const KnowledgeBase = () => {
  const { knowledgeId } = useGetSearchParams();

  const { data: knowledgeData, isLoading: isKnowledgeDataIsLoading } =
    useGetKnowledgeByIdQuery(
      {
        id: +knowledgeId,
      },
      {
        skip: !knowledgeId,
      }
    );

  const isKnowledgeExist = !isKnowledgeDataIsLoading && !!knowledgeData;
  const isCertainKnowledgePage = window.location.search !== "";

  return (
    <div className={styles.knowledgeBaseWrapper}>
      {!isCertainKnowledgePage && (
        <>
          {/* todo: продумать структуру базны знаний */}

          <Typography.Title className={styles.knowledgeBaseTitle} level={3}>
            База знаний
          </Typography.Title>

          <Input.Search
            placeholder="Поиск знаний..."
            // onSearch={handleSearchKnowledge}
            allowClear
          />
        </>
      )}

      {isCertainKnowledgePage && (
        <>
          {isKnowledgeExist ? (
            <Knowledge knowledgeData={knowledgeData} />
          ) : (
            <EmptyKnowledge />
          )}
        </>
      )}
    </div>
  );
};
