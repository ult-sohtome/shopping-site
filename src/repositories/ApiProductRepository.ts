import type { Product, ProductRepository } from '../interfaces/ProductRepository';

export class ApiProductRepository implements ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('商品データの取得に失敗しました。');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`エラーが発生しました。: ${error}`);
    }
  }
}