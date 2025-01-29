export const directionCategoryTableLabels = {
  tgCallbackData: "Телеграм callback_data",
  name: "Название",
  direction: "Направление",
  stack: "Стек",
};

export const directionCategoryTableDataIndexes = {
  tgCallbackData: "tgCallbackData",
  name: "name",
  direction: "directionId",
  stack: "stackId",
};

export const directionCategoryColumns = [
  {
    title: directionCategoryTableLabels.tgCallbackData,
    dataIndex: directionCategoryTableDataIndexes.tgCallbackData,
  },
  {
    title: directionCategoryTableLabels.name,
    dataIndex: directionCategoryTableDataIndexes.name,
  },
];
