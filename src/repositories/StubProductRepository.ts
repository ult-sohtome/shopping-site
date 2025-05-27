import type { Product, ProductRepositoryInterface } from "@/interfaces/ProductRepositoryInterface";

export class StubProductRepository implements ProductRepositoryInterface {
  constructor(
    private shouldFail: boolean = false,
    private delayMs: number = 1000
  ) {}

  private readonly products: Array<Product> = [
    { id: 1, title: "Product 1", price: 10, description: "Description 1", category: "book", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3BuzxKMDUyDAxJ3uSmOUDoBuAk4PHL6wJ-sbkoWaf0kFhAVGKJyb68UlWudASWVefUbWWJswxOyYVhup-Mesvpq0KORxCwjk8TjojMTjkduxmrZgaJXwg_wjz8YLh6aXfjdxYWEvKCT1_/s538/sports_katsudouryoukei.png" },
    { id: 2, title: "Product 2", price: 20, description: "Description 2", category: "clothing", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSyGh8RpLf71mLoVpgbImOme2usyVmWE-Zs3ib-jWCxKp-Ib-ctcvLslI4C4jmsWGTUIgnjHd8myqoo1d-sAmkgprAZfog6yQhnEe4zEbke__Dc2od2IyDVI7jJZncDTE0J7je3NI9hfIC/s618/kaden_oil_heater.png" },
    { id: 3, title: "Product 3", price: 30, description: "Description 3", category: "consumer electronics", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv_XVADjx5Cg8ZzzI4XMXLT1o4BDTSrUn5SHOuN8pyRpeEw4uT9KHgHVa_GsteAL6BRJNjRdbE7b3sTxyxJwr72Mis9dLQyWrSYy5cAytdJlcUBQn9KsSr9Vk0R1fv6e-sY31CNQUeBAUR/s536/building_monooki_goya.png" },
    { id: 4, title: "Product 4", price: 40, description: "Description 4", category: "furniture", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiA-YvxRfcNLdb8pY-pEGV_InKsic41qZ9q-ZkSi4sZozhlYNFzPbcY6UdLIanaBr7WDfQk7b7evjMPBKtJHl5KiMHXvlrVoJAwTIAkSyQMoAGbiuDj5qva6bz86dTnEXSqpYLFyFTyYpCA/s400/beads_cushion_woman.png" },
    { id: 5, title: "Product 5", price: 50, description: "Description 5", category: "toys", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvJAfNqzySw89hcgfozrN-qVdpEfHcx_LbG0bAVR5Izahy6UJTyOuSjhnhdOWYKEZto-kuXq99rLmgRCWnIi7po8cS__sxj1wSbP0tO_t0nVCPV2FYxrODJiRiA0u-ctWC_FhyphenhyphenAu3LReuD/s400/game_gaming_chair.png" }
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