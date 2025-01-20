import React from "react";

import { Input, Pagination, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { RightOutlined } from "@ant-design/icons";

import { SolutionFileListItem } from "components/SolutionFileViewer/SolutionFileListItem/SolutionFileListItem";

import { useGetDirectionByIdQuery } from "store/api/direction/direction-api";
import { useGetDirectionCategoryByIdQuery } from "store/api/direction_category/direction-category-api";
import { useGetDirectionStackByIdQuery } from "store/api/direction_stack/direction-stack-api";
import { useSearchSolutionFilesMutation } from "store/api/elastic_search/elastic-search-api";
import { useGetSolutionsFilesByParamsQuery } from "store/api/solution_file/solution-file-api";
import { IGetSolutionsFilesByParamsResponse } from "store/api/solution_file/types";

import { PAGINATION_PAGE_SIZE } from "constants/solution-files-constants";

import styles from "./DisplayedSolutionsFilesList.module.scss";

export const DisplayedSolutionsFilesList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchResults, setSearchResults] =
    React.useState<IGetSolutionsFilesByParamsResponse | null>(null);

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

      const { data, totalCount } = await searchSolutionFiles({
        searchQuery,
      }).unwrap();

      setSearchResults({ data, totalCount });
    } catch (error) {
      console.error(error);
      setSearchResults(null);
    }
  };

  const displayedData = searchResults || solutionsFilesByParamsData;

  const handlePageChange = (currentPage: number) => {
    if (!searchResults) {
      setCurrentPage(currentPage);
    }
  };

  return (
    <div className={styles.displayedSolutionsFilesListWrapper}>
      <Typography.Title
        className={styles.displayedSolutionsFilesListTitle}
        level={3}
      >
        {directionData?.name} <RightOutlined /> {stackData?.name}{" "}
        <RightOutlined /> {categoryData?.name}
      </Typography.Title>

      <Input.Search
        className={styles.displayedSolutionsFilesListSearchInput}
        placeholder="Поиск решений..."
        onSearch={handleSearchSolutionsFiles}
        allowClear
        enterButton
      />

      <div className={styles.displayedSolutionsFilesListCardsWrapper}>
        {displayedData?.data?.map((solutionFile) => (
          <React.Fragment key={solutionFile.id}>
            <SolutionFileListItem {...solutionFile} />
          </React.Fragment>
        ))}
      </div>

      {searchResults && searchResults?.totalCount < 1 && (
        <Typography.Text
          className={styles.displayedSolutionsFilesListEmptyText}
        >
          Решений не найдено, попробуйте еще раз
        </Typography.Text>
      )}

      {(displayedData?.totalCount ?? 0) > 0 && !searchResults && (
        <div className={styles.displayedSolutionsFilesListPaginationWrapper}>
          <Typography.Text
            className={styles.displayedSolutionsFilesListPaginationText}
          >
            Всего решений: <b>{displayedData?.totalCount}</b>
          </Typography.Text>

          <Pagination
            current={currentPage}
            total={displayedData?.totalCount}
            pageSize={PAGINATION_PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
