import React from "react";

import { Input, InputRef } from "antd";
import {
  IFileOrFolder,
  ISearchResult,
  ISolutionFile,
} from "types/IFileOrOrder";

interface ISearchSolutionsFilesInputProps {
  isSearchSolutionsFilesModalOpen: boolean;
  solutionsFilesTree: IFileOrFolder | null;
  setSolutionsFilesSearchResults: React.Dispatch<
    React.SetStateAction<ISearchResult[]>
  >;
}

interface IRecursivelySearchArgs {
  solutionFileTree: IFileOrFolder;
  searchQuery: string;
  solutionFilePath?: string;
}

export const SearchSolutionsFilesInput = (
  props: ISearchSolutionsFilesInputProps
) => {
  const {
    isSearchSolutionsFilesModalOpen,
    solutionsFilesTree,
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

  const recursivelySearchSolutionsFiles = (
    args: IRecursivelySearchArgs
  ): ISearchResult[] => {
    const { solutionFileTree, searchQuery, solutionFilePath = "" } = args;

    if (!solutionFileTree || typeof solutionFileTree !== "object") {
      return [];
    }

    const searchResults: ISearchResult[] = [];

    Object.keys(solutionFileTree).forEach((key) => {
      const currentSolutionFile = solutionFileTree[key];
      const currentSolutionFilePath = `${solutionFilePath}/${key}`;

      if (!currentSolutionFile || typeof currentSolutionFile !== "object") {
        return;
      }

      const isSolutionFileNameMatchWithSearchQuery =
        currentSolutionFile.type === "file" &&
        key.toLowerCase().includes(searchQuery.toLowerCase());

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
          file: currentSolutionFile as ISolutionFile,
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
      allowClear
    />
  );
};
