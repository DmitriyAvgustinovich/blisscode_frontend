import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";

import { IGetAllKnowledgesResponse } from "store/knowledge-base/types";

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
            <Typography.Text className={styles.searchedKnowledgeListItemDate}>
              <CalendarOutlined /> Создано{" "}
              <b>{getFormattedDate(knowledgeData.createdAt)}</b>
            </Typography.Text>

            <Typography.Text className={styles.searchedKnowledgeListItemTitle}>
              {knowledgeData.title}
            </Typography.Text>

            <Link to={`?knowledgeId=${knowledgeData.id}`}>
              <Button size="small" type="primary" icon={<EyeOutlined />}>
                Читать подробнее
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
