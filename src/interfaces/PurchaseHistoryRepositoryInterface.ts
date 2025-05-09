import type { Product } from "@/interfaces/ProductRepositoryInterface";

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: Product): Promise<void>;
}