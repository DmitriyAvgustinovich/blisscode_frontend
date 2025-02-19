import React from "react";

import { Button, Modal } from "antd";
import {
  IFileOrFolder,
  ISearchResult,
  IOpenedSolutionFile,
} from "types/IFileOrOrder";

import { SearchOutlined } from "@ant-design/icons";

import { SearchSolutionsFilesInput } from "components/SolutionFileViewer/SearchSolutionsFilesInput/SearchSolutionsFilesInput";
import { SolutionsFilesSearchResult } from "components/SolutionFileViewer/SolutionsFilesSearchResult/SolutionsFilesSearchResult";

import styles from "./SearchSolutionsFilesModal.module.scss";

interface ISearchSolutionsFilesModalProps {
  solutionsFilesTree: IFileOrFolder | null;
  searchSolutionsFilesResults: ISearchResult[];
  setSolutionsFilesSearchResults: React.Dispatch<
    React.SetStateAction<ISearchResult[]>
  >;
  openedSolutionsFiles: IOpenedSolutionFile[];
  setOpenedSolutionsFiles: React.Dispatch<
    React.SetStateAction<IOpenedSolutionFile[]>
  >;
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

  const handleOpenSolutionFileFromSearch = async (args: ISearchResult) => {
    const { path, name, file } = args;

    const solutionFileContent = await file.getSolutionFileContent();

    const alreadyOpened = openedSolutionsFiles.some(
      (file) => file.solutionFilePath === path
    );

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

    handleCloseSearchSolutionsFilesModal();
  };

  return (
    <>
      <Button
        className={styles.searchSolutionsFilesButton}
        icon={<SearchOutlined />}
        onClick={handleOpenSearchSolutionsFilesModal}
        size="small"
      >
        Поиск файлов по имени...
      </Button>

      <Modal
        open={isSearchSolutionsFilesModalOpen}
        onCancel={handleCloseSearchSolutionsFilesModal}
        footer={null}
        mask={false}
        closeIcon={null}
      >
        <SearchSolutionsFilesInput
          isSearchSolutionsFilesModalOpen={isSearchSolutionsFilesModalOpen}
          solutionsFilesTree={solutionsFilesTree}
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
