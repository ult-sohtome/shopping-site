import type { PurchaseHistory, PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistories';

  addPurchaseHistory(purchaseProduct: PurchaseHistory): void {
    const purchaseHistory: Array<PurchaseHistory> = this.getPurchaseHistories();
    purchaseHistory.push(purchaseProduct);
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistory));
  }

  getPurchaseHistories(): Array<PurchaseHistory> {
    const history: string | null = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }

  getPurchaseHistoriesLocalStorageKey(): string {
    return this.storageKey;
  }
}