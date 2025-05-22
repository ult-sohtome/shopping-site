import type { ProductEntry } from "./ProductEntry";

export interface PurchaseHistory {
  productOrders: Array<ProductEntry>,
  rate: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseHistory): void;
  getPurchaseHistories(): Array<PurchaseHistory>;
  getPurchaseHistoriesLocalStorageKey(): string;
}