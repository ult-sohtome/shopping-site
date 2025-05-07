export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductRepositoryInterface {
  getAllProducts(): Promise<Product[]>;
}

export type ProductWithYen = Product & {
  priceInYen: number;
};