import { Typography } from "antd";

import { IOpenSolutionFileFromSearch, TRecordStringObject } from "types";

import styles from "./SolutionsFilesSearchResult.module.scss";

interface ISolutionsFilesSearchResultProps {
  searchSolutionsFilesResults: TRecordStringObject[];
  handleOpenSolutionFileFromSearch: (args: IOpenSolutionFileFromSearch) => void;
}

export const SolutionsFilesSearchResult = (
  props: ISolutionsFilesSearchResultProps
) => {
  const { searchSolutionsFilesResults, handleOpenSolutionFileFromSearch } =
    props;

  return (
    <>
      <Typography.Text className={styles.solutionsFilesResultsTitle}>
        Совпадений: <b>{searchSolutionsFilesResults.length}</b>
      </Typography.Text>

      <div className={styles.solutionsFilesSearchResultWrapper}>
        {searchSolutionsFilesResults.map((searchSolutionFileResult) => {
          const handleClickSearchResultFile = () => {
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            handleOpenSolutionFileFromSearch(searchSolutionFileResult);
          };

          return (
            <div
              className={styles.solutionsFilesSearchResult}
              key={searchSolutionFileResult.path}
              onClick={handleClickSearchResultFile}
            >
              <Typography.Text
                className={styles.solutionsFilesSearchResultText}
              >
                {searchSolutionFileResult.path.slice(1)}
              </Typography.Text>
            </div>
          );
        })}
      </div>
    </>
  );
};
