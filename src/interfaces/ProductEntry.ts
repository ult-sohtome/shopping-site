import type { Product } from "./ProductRepositoryInterface";

export interface PurchasedProductEntry {
  id: number,
  product: Product,
  quantity: number,
  deletedAt: string | null
}

export type CartProductEntry = Omit<PurchasedProductEntry, "id">;