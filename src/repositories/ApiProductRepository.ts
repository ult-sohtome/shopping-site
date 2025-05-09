import type { Product, ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';

export class ApiProductRepository implements ProductRepositoryInterface {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('商品データの取得に失敗しました。');
    }
    return await response.json();
  }
  async getProductById(id: number): Promise<Product | null> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('指定された商品データの取得に失敗しました。');
    }
    return await response.json();
  }
}