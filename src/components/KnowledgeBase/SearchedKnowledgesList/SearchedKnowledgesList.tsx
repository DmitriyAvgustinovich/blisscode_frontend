import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { IGetAllKnowledgesResponse } from "store/api/knowledge_base/types";

import { getFormattedDate } from "utils";

import styles from "./SearchedKnowledgesList.module.scss";

interface ISearchedKnowledgesListProps {
  searchKnowledgesListData: IGetAllKnowledgesResponse;
}

export const SearchedKnowledgesList = (props: ISearchedKnowledgesListProps) => {
  const { searchKnowledgesListData } = props;

  return (
    <div className={styles.searchedKnowledgesListContentWrapper}>
      {searchKnowledgesListData && searchKnowledgesListData.totalCount < 1 && (
        <Typography.Text className={styles.searchedKnowledgesListEmptyText}>
          Знаний не найдено, попробуйте еще раз
        </Typography.Text>
      )}

      <div className={styles.searchedKnowledgesListWrapper}>
        {searchKnowledgesListData?.data?.map((knowledgeData) => (
          <div
            key={knowledgeData.id}
            className={styles.searchedKnowledgeListItemWrapper}
          >
            <Typography.Text className={styles.searchedKnowledgesListText}>
              Создано <b>{getFormattedDate(knowledgeData.createdAt)}</b>
            </Typography.Text>

            <TextWithLine elements={[<b>{knowledgeData.title}</b>]} />

            <Link
              className={styles.searchedKnowledgeListItemLink}
              to={`?knowledgeId=${knowledgeData.id}`}
            >
              <Button size="small" type="primary">
                Подробнее
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
