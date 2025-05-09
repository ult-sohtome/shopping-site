export interface PurchaseHistoryRepositoryInterface {
  addPurchaseHistory(productId: number): Promise<void>;
}