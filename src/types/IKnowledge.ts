export enum ETypesKnowledge {
  MESSAGE = "MESSAGE",
  ABSTRACT = "ABSTRACT",
  LINK = "LINK",
}

export interface IKnowledge {
  id: number;
  title: string;
  text: string;
  type: ETypesKnowledge;
  link?: string;
  direction_id: number;
  createdAt?: string;
  updatedAt?: string;
}
