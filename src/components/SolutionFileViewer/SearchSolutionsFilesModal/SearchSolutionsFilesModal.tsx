import React from "react";

import { Button, Modal } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { SearchSolutionsFilesInput } from "components/SolutionFileViewer/SearchSolutionsFilesInput/SearchSolutionsFilesInput";
import { SolutionsFilesSearchResult } from "components/SolutionFileViewer/SolutionsFilesSearchResult/SolutionsFilesSearchResult";

import {
  IFileOrFolder,
  IOpenSolutionFileFromSearch,
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
    args: IOpenSolutionFileFromSearch
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
      <Button
        className={styles.searchSolutionsFilesButton}
        icon={<SearchOutlined />}
        onClick={handleOpenSearchSolutionsFilesModal}
      >
        Поиск файлов по имени...
      </Button>

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

        {searchSolutionsFilesResults.length > 0 && (
          <SolutionsFilesSearchResult
            searchSolutionsFilesResults={searchSolutionsFilesResults}
            handleOpenSolutionFileFromSearch={handleOpenSolutionFileFromSearch}
          />
        )}
      </Modal>
    </>
  );
};
