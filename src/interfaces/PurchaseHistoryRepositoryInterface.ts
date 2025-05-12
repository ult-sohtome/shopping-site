export interface PurchaseProduct {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  },
  rate: number,
  quantity: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseProduct): void;
}