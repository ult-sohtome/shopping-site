import type { Product, ProductRepository } from '../interfaces/ProductRepository';

export class ApiProductRepository implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('商品データの取得に失敗しました。');
      }
      return await response.json();
  }
}