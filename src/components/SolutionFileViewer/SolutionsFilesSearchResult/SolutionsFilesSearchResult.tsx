import { Typography } from "antd";

import styles from "./SolutionsFilesSearchResult.module.scss";

interface ISolutionFile {
  type: "file";
  content: string;
  getSolutionFileContent: () => Promise<string>;
}

interface ISearchResult {
  path: string;
  name: string;
  file: ISolutionFile;
}

interface ISolutionsFilesSearchResultProps {
  searchSolutionsFilesResults: ISearchResult[];
  handleOpenSolutionFileFromSearch: (args: ISearchResult) => void;
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
        {searchSolutionsFilesResults.map(({ path, name, file }) => {
          const handleClickSearchResultFile = () => {
            handleOpenSolutionFileFromSearch({
              path,
              name,
              file,
            });
          };

          return (
            <div
              className={styles.solutionsFilesSearchResult}
              key={path}
              onClick={handleClickSearchResultFile}
            >
              <Typography.Text
                className={styles.solutionsFilesSearchResultText}
              >
                {name}
              </Typography.Text>
            </div>
          );
        })}
      </div>
    </>
  );
};
