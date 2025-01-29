export interface ISolutionFile {
  id: number;
  uuid: string;
  filename?: string;
  name: string;
  description: string;
  directionId: number;
  stackId: number;
  directionCategoryId: number;
  filePath?: string;
}
