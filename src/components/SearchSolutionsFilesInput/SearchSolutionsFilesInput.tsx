import React from "react";

import { Input, InputRef } from "antd";

import { IFileOrFolder, TRecordStringObject } from "types";

interface ISearchSolutionsFilesInputProps {
  isSearchSolutionsFilesModalOpen: boolean;
  solutionsFilesTree: IFileOrFolder | null;
  // setSolutionsFilesSearchResults: any;
}

export const SearchSolutionsFilesInput = (
  props: ISearchSolutionsFilesInputProps
) => {
  const {
    isSearchSolutionsFilesModalOpen,
    solutionsFilesTree,
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSolutionsFilesSearchResults,
  } = props;

  const [searchSolutionFileValue, setSearchSolutionFileValue] =
    React.useState("");

  const inputRef = React.useRef<InputRef>(null);

  React.useEffect(() => {
    if (isSearchSolutionsFilesModalOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchSolutionsFilesModalOpen]);

  const recursivelySearchSolutionsFiles = (args: TRecordStringObject) => {
    const { solutionFileTree, searchQuery, solutionFilePath = "" } = args;

    if (!solutionFileTree || typeof solutionFileTree !== "object") {
      return [];
    }

    const searchResults: TRecordStringObject[] = [];

    Object.keys(solutionFileTree).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const currentSolutionFile = solutionFileTree[key];
      const currentSolutionFilePath = `${solutionFilePath}/${key}`;

      const isSolutionFileNameMatchWithSearchQuery =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentSolutionFile.type === "file" &&
        key.toLowerCase().includes(searchQuery.toLowerCase());

      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (currentSolutionFile.type === "folder") {
        searchResults.push(
          ...recursivelySearchSolutionsFiles({
            solutionFileTree: currentSolutionFile,
            searchQuery,
            solutionFilePath: currentSolutionFilePath,
          })
        );
      } else if (isSolutionFileNameMatchWithSearchQuery) {
        searchResults.push({
          path: currentSolutionFilePath,
          name: key,
          file: currentSolutionFile,
        });
      }
    });

    return searchResults;
  };

  const handleSearchSolutionsFiles = (searchQuery: string) => {
    setSearchSolutionFileValue(searchQuery);

    if (!searchQuery) {
      setSolutionsFilesSearchResults([]);
      return;
    }

    if (solutionsFilesTree !== null) {
      const searchResult = recursivelySearchSolutionsFiles({
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        solutionFileTree: solutionsFilesTree,
        searchQuery,
      });

      setSolutionsFilesSearchResults(searchResult);
    }
  };

  const onChangeSearchSolutionFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleSearchSolutionsFiles(event.target.value);
  };

  return (
    <Input
      placeholder="Поиск файлов по имени..."
      value={searchSolutionFileValue}
      onChange={onChangeSearchSolutionFiles}
      ref={inputRef}
    />
  );
};
