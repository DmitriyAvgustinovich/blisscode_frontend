export interface IUser {
  id: number;
  username: string;
  telegram_id: string;
  createdAt: Date;
  subscription: Date;
  subscribeTasks: boolean;
  baseChannel: string;
  dateStartSub: Date;
  dateLastCheckSub: Date;
  salt: string;
  hashedTelegramId: string;
}
