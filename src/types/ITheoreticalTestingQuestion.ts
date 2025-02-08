export interface ITheoreticalTestingQuestion {
  id: number;
  name: string;
  directionId: number;
  stackId: number;
  answer: string;
}

export interface ITheoreticalTestResults {
  id: number;
  directionId: number;
  stackId: number;
  answersResult: string;
  createdAt: string;
}
