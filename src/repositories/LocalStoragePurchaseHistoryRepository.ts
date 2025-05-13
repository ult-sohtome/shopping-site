import type { PurchaseProduct, PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistory';

  addPurchaseHistory(purchaseProduct: PurchaseProduct): void {
    const purchaseHistory: Array<PurchaseProduct>  = this.getPurchaseHistory();
    purchaseHistory.push(purchaseProduct);
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistory));
  }

  getPurchaseHistory(): Array<PurchaseProduct> {
    const history: string | null = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }
}