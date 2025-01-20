import React from "react";

import { Input, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { useSearchKnowledgesMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useGetAllDirectionKnowledgesQuery,
  useGetKnowledgeByIdQuery,
} from "store/knowledge-base/knowledge-base.api";
import { IGetAllKnowledgesResponse } from "store/knowledge-base/types";

import { EmptyKnowledge } from "./EmptyKnowledge/EmptyKnowledge";
import { Knowledge } from "./Knowledge/Knowledge";
import styles from "./KnowledgeBase.module.scss";
import { KnowledgesList } from "./KnowledgesList/KnowledgesList";
import { SearchedKnowledgesList } from "./SearchedKnowledgesList/SearchedKnowledgesList";

export const KnowledgeBase = () => {
  const [searchResults, setSearchResults] =
    React.useState<IGetAllKnowledgesResponse | null>(null);

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

  const { data: allDirectionKnowledgesData } =
    useGetAllDirectionKnowledgesQuery();

  const [searchKnowledge] = useSearchKnowledgesMutation();

  const handleSearchKnowledge = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
      }

      const { data, totalCount } = await searchKnowledge({
        searchQuery,
      }).unwrap();

      setSearchResults({ data, totalCount });
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  return (
    <div className={styles.knowledgeBaseWrapper}>
      {!isCertainKnowledgePage && (
        <>
          <Typography.Title level={2} className={styles.knowledgeBaseTitle}>
            База знаний
          </Typography.Title>

          <Input.Search
            placeholder="Поиск по базе знаний..."
            onSearch={handleSearchKnowledge}
            allowClear
            enterButton
          />

          {searchResults ? (
            <SearchedKnowledgesList searchKnowledgesListData={searchResults} />
          ) : (
            <KnowledgesList knowledgesList={allDirectionKnowledgesData ?? []} />
          )}
        </>
      )}

      {isCertainKnowledgePage && (
        <>
          {isKnowledgeDataIsLoading && (
            <Typography.Text className={styles.knowledgeBaseTitle}>
              Загрузка...
            </Typography.Text>
          )}

          {!isKnowledgeDataIsLoading && isKnowledgeExist && (
            <Knowledge knowledgeData={knowledgeData} />
          )}

          {!isKnowledgeDataIsLoading && !isKnowledgeExist && <EmptyKnowledge />}
        </>
      )}
    </div>
  );
};
