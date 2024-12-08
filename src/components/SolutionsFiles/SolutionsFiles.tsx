import React from "react";

import { Button, Pagination, Typography } from "antd";
import { useGetActiveUser, useGetSearchParams } from "hooks";
import { Link } from "react-router-dom";

import { ControlFilled, RightOutlined } from "@ant-design/icons";

import { SolutionFileCard } from "components/SolutionFileCard/SolutionFileCard";

import { useGetDirectionByIdQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoryByIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStackByIdQuery } from "store/api/direction_stack/direction-stack-api";
import { useGetSolutionsFilesByParamsQuery } from "store/api/solution_file/solution-file-api";

import { RouterPath } from "configs/route-config";

import { PAGINATION_PAGE_SIZE } from "constants/solution-files-constants";

import styles from "./SolutionsFiles.module.scss";

export const SolutionsFiles = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { isActiveUserHasAdmin } = useGetActiveUser();

  const { directionId, stackId, categoryId } = useGetSearchParams();

  const { data: directionData } = useGetDirectionByIdQuery({
    id: +directionId,
  });

  const { data: stackData } = useGetDirectionStackByIdQuery({
    id: +stackId,
  });

  const { data: categoryData } = useGetDirectionCategoryByIdQuery({
    id: +categoryId,
  });

  const { data: solutionsFilesData } = useGetSolutionsFilesByParamsQuery({
    directionId: +directionId,
    stackId: +stackId,
    categoryId: +categoryId,
    page: currentPage,
    pageSize: PAGINATION_PAGE_SIZE,
  });

  const onPageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <div className={styles.solutionsFilesWrapper}>
      <Typography.Title className={styles.solutionsFilesTitle}>
        {directionData?.name} <RightOutlined /> {stackData?.name}{" "}
        <RightOutlined /> {categoryData?.name}
      </Typography.Title>

      {isActiveUserHasAdmin && (
        <Link to={RouterPath.admin_panel} target="_blank">
          <Button
            className={styles.solutionsFilesGoToAdminPanelButton}
            type="primary"
            icon={<ControlFilled />}
          >
            Админ панель
          </Button>
        </Link>
      )}

      <div className={styles.solutionsFilesCardsWrapper}>
        {solutionsFilesData?.data?.map((solutionFile) => (
          <React.Fragment key={solutionFile.id}>
            <SolutionFileCard {...solutionFile} />
          </React.Fragment>
        ))}
      </div>

      {(solutionsFilesData?.totalCount ?? 0) > 0 && (
        <div className={styles.solutionsFilesPaginationWrapper}>
          <Typography.Text className={styles.solutionsFilesPaginationText}>
            Всего решений: {solutionsFilesData?.totalCount}
          </Typography.Text>

          <Pagination
            pageSize={PAGINATION_PAGE_SIZE}
            current={currentPage}
            total={solutionsFilesData?.totalCount}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
