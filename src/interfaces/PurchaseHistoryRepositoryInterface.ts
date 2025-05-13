export interface PurchaseHistory {
  productOrders: {
    product: {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
    },
    quantity: number
  }[],
  rate: number,
  purchasedAt: string
}

export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(product: PurchaseHistory): void;
}