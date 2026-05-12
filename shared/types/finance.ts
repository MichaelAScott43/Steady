export type SpendCategory = 'food' | 'gas' | 'bills' | 'subscriptions' | 'entertainment' | 'debt' | 'income' | 'transfers' | 'misc';

export interface TransactionDTO {
  id: string;
  userId: string;
  merchantName: string;
  normalizedMerchant: string;
  amount: number;
  category: SpendCategory;
  occurredAt: string;
}
