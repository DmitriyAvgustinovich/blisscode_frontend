export interface IUser {
  id: number;
  username: string;
  telegramId: string;
  createdAt: string;
  subscribeTasks: boolean;
  subscribeBase: boolean;
  baseChannel: string;
  dateStartSub: string;
  dateLastCheckSub: string;
  salt: string;
  hashedTelegramId: string;
}
