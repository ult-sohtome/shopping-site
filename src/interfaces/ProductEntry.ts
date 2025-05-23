import type { Product } from "./ProductRepositoryInterface";

export interface ProductEntry {
  entryId: number,
  product: Product,
  quantity: number,
  deletedAt: string | null
}
