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
  cashReceived?: string;
  coinReceived?: string;
  trxId: string;
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
