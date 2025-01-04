export interface ISolutionFile {
  id: number;
  uuid: string;
  filename?: string;
  name: string;
  description: string;
  direction_id: number;
  stack_id: number;
  direction_category_id: number;
  file_path?: string;
}
