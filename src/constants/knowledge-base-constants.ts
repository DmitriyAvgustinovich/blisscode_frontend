export const PAGINATION_PAGE_SIZE = 1;

export const knowledgeLabels = {
  id: "ID",
  title: "Название",
  text: "Описание",
  type: "Тип знания",
  link: "Ссылка на ресурс",
  createdAt: "Дата создания",
  directionKnowledge: "Направление знания",
  directionTopicKnowledge: "Топик направления знания",
};

export const knowledgeDataIndexes = {
  id: "id",
  title: "title",
  text: "text",
  type: "type",
  link: "link",
  createdAt: "createdAt",
  directionKnowledge: "directionKnowledgeId",
  directionKnowledgeTopic: "directionKnowledgeTopicId",
};

export const directionKnowledgeLabels = {
  id: "ID",
  name: "Название",
  description: "Описание",
};

export const directionKnowledgeDataIndexes = {
  id: "id",
  name: "name",
  description: "description",
};

export const directionTopicKnowledgeLabels = {
  id: "ID",
  name: "Название",
  directionKnowledge: "Направление знания",
};

export const directionTopicKnowledgeDataIndexes = {
  id: "id",
  name: "name",
  directionKnowledge: "directionKnowledgeId",
};
