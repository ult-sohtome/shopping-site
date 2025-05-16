import type { Product } from "./ProductRepositoryInterface";

export interface CartEntry {
  product: Product,
  quantity: number
}
