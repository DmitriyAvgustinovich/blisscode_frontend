import React from "react";

import { Typography, Pagination } from "antd";
import { useGetActiveUser } from "hooks";

import { useGetCvReviewResultsByHashedTelegramIdQuery } from "store/api/cv_review_result/cv-review-result-api";

import { PAGINATION_PAGE_SIZE_CV_REVIEW_RESULTS } from "constants/general-constants";

import styles from "./CvReviewHistory.module.scss";
import { CvReviewHistoryItem } from "./CvReviewHistoryItem/CvReviewHistoryItem";

export const CvReviewHistory = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { activeUserData } = useGetActiveUser();

  const { data: cvReviewResultsData } =
    useGetCvReviewResultsByHashedTelegramIdQuery({
      hashedTelegramId: activeUserData?.hashedTelegramId ?? "",
      page: currentPage,
      pageSize: PAGINATION_PAGE_SIZE_CV_REVIEW_RESULTS,
    });

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Typography.Text className={styles.cvReviewHistoryTitle}>
        В этом разделе вы можете ознакомиться с историей ревью резюме
      </Typography.Text>

      <div className={styles.cvReviewHistoryWrapper}>
        {cvReviewResultsData?.data?.map((cvReviewResult) => (
          <CvReviewHistoryItem
            key={cvReviewResult.id}
            cvReviewResultData={cvReviewResult}
          />
        ))}
      </div>

      <Pagination
        className={styles.cvReviewHistoryPaginationWrapper}
        current={currentPage}
        total={cvReviewResultsData?.totalCount}
        pageSize={PAGINATION_PAGE_SIZE_CV_REVIEW_RESULTS}
        onChange={handleChangePage}
      />
    </>
  );
};
