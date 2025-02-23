export enum ETypesKnowledge {
  TEXT = "TEXT",
  ABSTRACT = "ABSTRACT",
  LINK = "LINK",
}

export interface IKnowledge {
  id: number;
  title: string;
  text: string;
  type: ETypesKnowledge;
  link?: string;
  directionKnowledgeTopicId: number;
  directionKnowledgeId: number;
  createdAt: string;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
}

export interface IDirectionTopicKnowledge {
  id: number;
  name: string;
  directionKnowledgeId: number;
  knowledge?: IKnowledge[];
}

export interface IDirectionKnowledge {
  id: number;
  name: string;
  description?: string;
  topics?: IDirectionTopicKnowledge[];
}
