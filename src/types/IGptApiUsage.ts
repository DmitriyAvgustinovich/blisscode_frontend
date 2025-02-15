export interface IGptApiUsage {
  gptApiType: string;
  limit: number;
  remaining: number;
  label: string;
  usedToday: number;
}
