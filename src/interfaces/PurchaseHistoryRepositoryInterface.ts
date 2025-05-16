import type { CartEntry } from "./CartRepositoryInterface";

export interface PurchaseHistory {
  productOrders: Array<CartEntry>,
  rate: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseHistory): void;
}