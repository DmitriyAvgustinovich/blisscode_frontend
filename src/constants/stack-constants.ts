export const stackTableLabels = {
  tgCallbackData: "Телеграм callback_data",
  name: "Название",
  direction: "Направление",
};

export const stackTableDataIndexes = {
  tgCallbackData: "tg_callback_data",
  name: "name",
  direction: "direction_id",
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
