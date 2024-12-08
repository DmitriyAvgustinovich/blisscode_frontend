export const directionCategoryTableLabels = {
  tgCallbackData: "Телеграм callback_data",
  name: "Название",
  direction: "Направление",
  stack: "Стек",
};

export const directionCategoryTableDataIndexes = {
  tgCallbackData: "tg_callback_data",
  name: "name",
  direction: "direction_id",
  stack: "stack_id",
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
