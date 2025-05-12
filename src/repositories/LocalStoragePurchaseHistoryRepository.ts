import type { PurchaseProduct, PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistory';

  addPurchaseHistory(purchaseProduct: PurchaseProduct): void {
    const purchaseHistory: Array<PurchaseProduct>  = this.getPurchaseHistory();
    const index: number = purchaseHistory.findIndex(purchasedProduct =>
      purchasedProduct.product.id === purchaseProduct.product.id &&
      purchasedProduct.purchasedAt === purchaseProduct.purchasedAt
    );
    if (index !== -1) {
      purchaseHistory[index] = purchaseProduct;
    } else {
      purchaseHistory.push(purchaseProduct);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistory));
  }

  getPurchaseHistory(): Array<PurchaseProduct> {
    const history: string | null = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }
}