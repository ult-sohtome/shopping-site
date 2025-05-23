import type { ProductEntry } from "./ProductEntry";

export interface PurchaseHistory {
  historyId: number,
  productOrders: Array<ProductEntry>,
  rate: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseHistory): void;
  updatePurchaseHistories(purchaseHistories: Array<PurchaseHistory>): void;
}