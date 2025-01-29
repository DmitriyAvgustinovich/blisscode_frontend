export const stackTableLabels = {
  tgCallbackData: "Телеграм callback_data",
  name: "Название",
  direction: "Направление",
};

export const stackTableDataIndexes = {
  tgCallbackData: "tgCallbackData",
  name: "name",
  direction: "directionId",
};

export const stackColumns = [
  {
    title: stackTableLabels.tgCallbackData,
    dataIndex: stackTableDataIndexes.tgCallbackData,
  },
  {
    title: stackTableLabels.name,
    dataIndex: stackTableDataIndexes.name,
  },

];
