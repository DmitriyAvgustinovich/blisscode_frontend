export const PAGINATION_PAGE_SIZE = 3;

export const HIDDEN_FOLDERS_OR_FILES = [
  "__MACOSX",
  ".DS_Store",
  ".git",
  ".gitignore",
  ".vscode",
];

export const solutionFilesTableLabels = {
  filePath: "Решение",
  name: "Название",
  description: "Описание",
  direction: "Направление",
  stack: "Стек",
  directionCategory: "Категория направления",
};

export const solutionFilesTableDataIndexes = {
  filePath: "file_path",
  name: "name",
  description: "description",
  direction: "direction_id",
  stack: "stack_id",
  directionCategory: "direction_category_id",
};

export const solutionFilesColumns = [
  {
    title: solutionFilesTableLabels.filePath,
    dataIndex: solutionFilesTableDataIndexes.filePath,
  },
  {
    title: solutionFilesTableLabels.name,
    dataIndex: solutionFilesTableDataIndexes.name,
  },
  {
    title: solutionFilesTableLabels.description,
    dataIndex: solutionFilesTableDataIndexes.description,
  },
];

export const solutionFilePrefixesValidation = {
  direction_: "direction_",
  stack_: "stack_",
  category_: "category_",
};
