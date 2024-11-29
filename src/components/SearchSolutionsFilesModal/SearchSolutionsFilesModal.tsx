import React from "react";

import { Button, Modal, Typography } from "antd";

import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";

import { SearchSolutionsFilesInput } from "components/SearchSolutionsFilesInput/SearchSolutionsFilesInput";

import {
  IFileOrFolder,
  TRecordStringObject,
  TSetStateActionStrings,
} from "types";

import styles from "./SearchSolutionsFilesModal.module.scss";

interface ISearchSolutionsFilesModalProps {
  solutionsFilesTree: IFileOrFolder | null;
  searchSolutionsFilesResults: TRecordStringObject[];
  setSolutionsFilesSearchResults: TSetStateActionStrings;
  openedSolutionsFiles: TRecordStringObject[];
  setOpenedSolutionsFiles: TSetStateActionStrings;
  setActiveSolutionsFilePath: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

interface IOpenSolutionFileFromSearchArgs {
  file: File;
  path: string;
  name: string;
}

export const SearchSolutionsFilesModal = (
  props: ISearchSolutionsFilesModalProps
) => {
  const {
    solutionsFilesTree,
    searchSolutionsFilesResults,
    setSolutionsFilesSearchResults,
    openedSolutionsFiles,
    setOpenedSolutionsFiles,
    setActiveSolutionsFilePath,
  } = props;

  const [isSearchSolutionsFilesModalOpen, setIsSearchSolutionsFilesModalOpen] =
    React.useState(false);

  const handleOpenSearchSolutionsFilesModal = () => {
    setIsSearchSolutionsFilesModalOpen(true);
  };

  const handleCloseSearchSolutionsFilesModal = () => {
    setIsSearchSolutionsFilesModalOpen(false);
  };

  const handleOpenSolutionFileFromSearch = async (
    args: IOpenSolutionFileFromSearchArgs
  ) => {
    const { file, path, name } = args;

    const alreadyOpened = openedSolutionsFiles.some(
      (file) => file.solutionFilePath === path
    );

    try {
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const solutionFileContent = await file.getSolutionFileContent();

      const newSolutionFileTab = {
        solutionFilePath: path,
        solutionFileName: name,
        solutionFileContent,
      };

      if (!alreadyOpened) {
        setOpenedSolutionsFiles((prevFiles) => [
          ...prevFiles,
          newSolutionFileTab,
        ]);

        setActiveSolutionsFilePath(path);
      } else {
        setActiveSolutionsFilePath(path);
      }
    } catch (error) {
      console.log(error);
    }

    handleCloseSearchSolutionsFilesModal();
  };

  return (
    <>
      <div
        className={styles.searchSolutionsFilesButton}
        onClick={handleOpenSearchSolutionsFilesModal}
      >
        <SearchOutlined />
        <Typography.Text className={styles.searchSolutionsFilesButtonText}>
          Поиск файлов по имени...
        </Typography.Text>
      </div>

      <Modal
        title="Поиск файла по имени..."
        open={isSearchSolutionsFilesModalOpen}
        onCancel={handleCloseSearchSolutionsFilesModal}
        destroyOnClose
        footer={null}
        mask={false}
      >
        <SearchSolutionsFilesInput
          isSearchSolutionsFilesModalOpen={isSearchSolutionsFilesModalOpen}
          solutionsFilesTree={solutionsFilesTree}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setSolutionsFilesSearchResults={setSolutionsFilesSearchResults}
        />

        <div className={styles.searchSolutionsFilesSearchResultWrapper}>
          {searchSolutionsFilesResults.map((searchSolutionFileResult) => {
            const handleClickSearchResultFile = () => {
              //eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              handleOpenSolutionFileFromSearch(searchSolutionFileResult);
            };

            return (
              <div
                className={styles.searchSolutionsFilesSearchResult}
                key={searchSolutionFileResult.path}
                onClick={handleClickSearchResultFile}
              >
                <Button
                  className={styles.searchSolutionsFilesSearchResultButton}
                  icon={<FileTextOutlined />}
                  type="default"
                >
                  {searchSolutionFileResult.path}
                </Button>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
