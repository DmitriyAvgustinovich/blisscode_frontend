export const PAGINATION_PAGE_SIZE = 3;

export const HIDDEN_FOLDERS_OR_FILES = [
  "__MACOSX",
  ".DS_Store",
  ".git",
  ".gitignore",
  ".vscode",
];

export const solutionFilesLabels = {
  filePath: "Решение",
  name: "Название",
  description: "Описание",
  direction: "Направление",
  stack: "Стек",
  directionCategory: "Категория направления",
};

export const solutionFilesDataIndexes = {
  filePath: "filePath",
  name: "name",
  description: "description",
  direction: "directionId",
  stack: "stackId",
  directionCategory: "directionCategoryId",
};

export const solutionFilePrefixesValidation = {
  direction_: "direction_",
  stack_: "stack_",
  category_: "category_",
};
