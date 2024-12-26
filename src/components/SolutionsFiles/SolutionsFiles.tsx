import React from "react";

import { Button, Input, Pagination, Typography } from "antd";
import { useGetActiveUser, useGetSearchParams } from "hooks";
import { Link } from "react-router-dom";

import { ControlFilled, RightOutlined } from "@ant-design/icons";

import { SolutionFileCard } from "components/SolutionFileCard/SolutionFileCard";

import { useGetDirectionByIdQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoryByIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStackByIdQuery } from "store/api/direction_stack/direction-stack-api";
import { useSearchSolutionFilesMutation } from "store/api/elastic_search/elastic-search-api";
import { useGetSolutionsFilesByParamsQuery } from "store/api/solution_file/solution-file-api";

import { RouterPath } from "configs/route-config";

import { PAGINATION_PAGE_SIZE } from "constants/solution-files-constants";

import styles from "./SolutionsFiles.module.scss";

export const SolutionsFiles = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchResults, setSearchResults] = React.useState(null);

  const { isActiveUserHasAdmin } = useGetActiveUser();
  const { directionId, stackId, categoryId } = useGetSearchParams();

  const [searchSolutionFiles] = useSearchSolutionFilesMutation();

  const { data: directionData } = useGetDirectionByIdQuery({
    id: +directionId,
  });

  const { data: stackData } = useGetDirectionStackByIdQuery({
    id: +stackId,
  });

  const { data: categoryData } = useGetDirectionCategoryByIdQuery({
    id: +categoryId,
  });

  const { data: solutionsFilesByParamsData } =
    useGetSolutionsFilesByParamsQuery({
      directionId: +directionId,
      stackId: +stackId,
      categoryId: +categoryId,
      page: currentPage,
      pageSize: PAGINATION_PAGE_SIZE,
    });

  const handleSearchSolutionsFiles = async (searchQuery: string) => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults(null);
        return;
      }

      const response = await searchSolutionFiles({ searchQuery }).unwrap();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSearchResults(response);
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  const displayedData = searchResults || solutionsFilesByParamsData;

  const onPageChange = (currentPage: number) => {
    if (!searchResults) {
      setCurrentPage(currentPage);
    }
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

      <Input.Search
        className={styles.solutionsFilesSearchInput}
        placeholder="Поиск решений..."
        onSearch={handleSearchSolutionsFiles}
        allowClear
      />

      <div className={styles.solutionsFilesCardsWrapper}>
        {displayedData?.data?.map((solutionFile) => (
          <React.Fragment key={solutionFile.id}>
            <SolutionFileCard {...solutionFile} />
          </React.Fragment>
        ))}
      </div>

      {(displayedData?.totalCount ?? 0) > 0 && !searchResults && (
        <div className={styles.solutionsFilesPaginationWrapper}>
          <Typography.Text className={styles.solutionsFilesPaginationText}>
            Всего решений: {displayedData?.totalCount}
          </Typography.Text>

          <Pagination
            className={styles.solutionsFilesPagination}
            current={currentPage}
            total={displayedData?.totalCount}
            pageSize={PAGINATION_PAGE_SIZE}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
