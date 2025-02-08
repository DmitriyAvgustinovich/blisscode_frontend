import React from "react";

import { Typography, Pagination } from "antd";
import { useGetActiveUser } from "hooks";

import { useGetTestResultsByHashedTelegramIdQuery } from "store/api/theoretical_testing_results/theoretical-testing-results-api";

import { PAGINATION_PAGE_SIZE_THEORETICAL_TEST_RESULTS } from "constants/general-constants";

import styles from "./TheoreticalTestHistory.module.scss";
import { TheoreticalTestHistoryItem } from "./TheoreticalTestHistoryItem/TheoreticalTestHistoryItem";

export const TheoreticalTestHistory = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { activeUserData } = useGetActiveUser();

  const { data: testResultsData } = useGetTestResultsByHashedTelegramIdQuery({
    hashedTelegramId: activeUserData?.hashedTelegramId ?? "",
    page: currentPage,
    pageSize: PAGINATION_PAGE_SIZE_THEORETICAL_TEST_RESULTS,
  });

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Text className={styles.theoreticalTestHistoryTitle}>
        В этом разделе вы можете ознакомиться с историей прохождения
        теоретических тестов
      </Typography.Text>

      <div className={styles.theoreticalTestHistoryWrapper}>
        {testResultsData?.data?.map((testResult) => (
          <TheoreticalTestHistoryItem
            key={testResult.id}
            testResultData={testResult}
          />
        ))}
      </div>

      <Pagination
        className={styles.theoreticalTestHistoryPaginationWrapper}
        current={currentPage}
        total={testResultsData?.totalCount}
        pageSize={PAGINATION_PAGE_SIZE_THEORETICAL_TEST_RESULTS}
        onChange={handleChangePage}
      />
    </>
  );
};
