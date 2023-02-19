export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}
export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}
export interface TransactionModel {
  userId: string;
  type: TransactionType;
  amount: number;
  coin: string;
  network?: string;
  rate: number;
  wallet?: string;
  date: Date;
  status: TransactionStatus;
  id: string;
  cashReceived?: number;
  coinReceived?: number;
  trxId: string;
  imageUrl?: string;
}

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  bank: {
    bankName: string;
    acctNo: string;
    acctName: string;
  };
  transaction: TransactionModel[];
  date: Date;
}

export interface CoinCurrency {
  crypto: string;
  wallet: string;
  image?: string;
  id: string;
}
export interface AdminDetails {
  id: string;
  acctName: string;
  acctNumber: string;
  bankName: string;
  sellRate: number;
  buyRate: number;
  coins?: CoinCurrency[];
}
