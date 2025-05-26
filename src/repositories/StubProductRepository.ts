import type { Product, ProductRepositoryInterface } from "@/interfaces/ProductRepositoryInterface";

export class StubProductRepository implements ProductRepositoryInterface {
  constructor(
    private shouldFail: boolean = false,
    private delayMs: number = 1000
  ) {}

  private readonly products: Array<Product> = [
    { id: 1, title: "Product 1", price: 10, description: "Description 1", category: "book", image: "image1.jpg" },
    { id: 2, title: "Product 2", price: 20, description: "Description 2", category: "clothing", image: "image2.jpg" },
    { id: 3, title: "Product 3", price: 30, description: "Description 3", category: "consumer electronics", image: "image3.jpg" },
    { id: 4, title: "Product 4", price: 40, description: "Description 4", category: "furniture", image: "image4.jpg" },
    { id: 5, title: "Product 5", price: 50, description: "Description 5", category: "toys", image: "image5.jpg" }
  ];

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delayMs));
  }

  async getAllProducts(): Promise<Product[]> {
    await this.simulateDelay();
    if (this.shouldFail) {
      throw new Error('(スタブ)商品データの取得に失敗しました。');
    }
    return this.products;
  }

  async getProductById(id: number): Promise<Product | null> {
    await this.simulateDelay();
    if (this.shouldFail) {
      throw new Error('(スタブ)指定された商品データの取得に失敗しました。');
    }
    const product = this.products.find(product => product.id === id);
    return product || null;
  }
}