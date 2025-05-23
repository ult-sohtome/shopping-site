import type { PurchasedProductEntry } from "./ProductEntry";

export interface PurchaseHistory {
  id: number,
  productOrders: Array<PurchasedProductEntry>,
  rate: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseHistory): void;
  updatePurchaseHistories(purchaseHistories: Array<PurchaseHistory>): void;
}