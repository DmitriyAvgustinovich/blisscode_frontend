export interface IUser {
  id: number;
  username: string;
  telegram_id: string;
  createdAt: Date;
  subscribeTasks: boolean;
  subscribeBase: boolean;
  baseChannel: string;
  dateStartSub: Date;
  dateLastCheckSub: Date;
  salt: string;
  hashedTelegramId: string;
}
