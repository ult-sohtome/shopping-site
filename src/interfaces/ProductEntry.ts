import type { Product } from "./ProductRepositoryInterface";

export interface ProductEntry {
  product: Product,
  quantity: number,
  deletedAt: string | null
}
