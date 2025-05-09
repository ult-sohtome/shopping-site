import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistory';

  async addPurchaseHistory(productId: number): Promise<void> {
    const purchaseHistory = this.getPurchaseHistory();
    purchaseHistory.push({ id: purchaseHistory.length + 1, productId });
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistory));
  }

  getPurchaseHistory(): Array<{ id: number; productId: number }> {
    const history = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }
}