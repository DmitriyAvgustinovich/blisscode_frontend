import React from "react";

import { Input, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { LoadingOutlined } from "@ant-design/icons";

import { useSearchKnowledgesMutation } from "store/api/elastic_search/elastic-search-api";
import {
  useGetAllDirectionKnowledgesQuery,
  useGetKnowledgeByIdQuery,
} from "store/api/knowledge_base/knowledge-base.api";
import { IGetAllKnowledgesResponse } from "store/api/knowledge_base/types";

import { EmptyKnowledge } from "./EmptyKnowledge/EmptyKnowledge";
import { Knowledge } from "./Knowledge/Knowledge";
import styles from "./KnowledgeBase.module.scss";
import { KnowledgesList } from "./KnowledgesList/KnowledgesList";
import { SearchedKnowledgesList } from "./SearchedKnowledgesList/SearchedKnowledgesList";

export const KnowledgeBase = () => {
  const [searchResults, setSearchResults] =
    React.useState<IGetAllKnowledgesResponse | null>(null);

  const [searchValue, setSearchValue] = React.useState("");

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
  const isChoosenKnowledgePage = !!knowledgeId;

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

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.knowledgeBaseWrapper}>
      {!isChoosenKnowledgePage && (
        <>
          <Typography.Title level={2} className={styles.knowledgeBaseTitle}>
            База знаний
          </Typography.Title>

          <Input.Search
            placeholder="Поиск по базе знаний..."
            onSearch={handleSearchKnowledge}
            value={searchValue}
            onChange={handleChangeSearchInput}
            allowClear
            enterButton
          />

          {searchResults ? (
            <SearchedKnowledgesList searchKnowledgesListData={searchResults} />
          ) : (
            <div className={styles.knowledgeBaseListWrapper}>
              <KnowledgesList
                knowledgesList={allDirectionKnowledgesData ?? []}
              />
            </div>
          )}
        </>
      )}

      {isChoosenKnowledgePage && (
        <>
          {isKnowledgeDataIsLoading && (
            <Typography.Text className={styles.knowledgeBaseTitle}>
              <LoadingOutlined /> Загрузка...
            </Typography.Text>
          )}

          {!isKnowledgeDataIsLoading && isKnowledgeExist && (
            <Knowledge
              knowledgeData={knowledgeData}
              isKnowledgeDataIsLoading={isKnowledgeDataIsLoading}
            />
          )}

          {!isKnowledgeDataIsLoading && !isKnowledgeExist && <EmptyKnowledge />}
        </>
      )}
    </div>
  );
};
