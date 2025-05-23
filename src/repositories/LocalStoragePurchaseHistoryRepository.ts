import type { PurchaseHistory, PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistories';

  addPurchaseHistory(purchaseProduct: PurchaseHistory): void {
    const purchaseHistories: Array<PurchaseHistory> = this.getPurchaseHistories();
    purchaseHistories.push(purchaseProduct);
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistories));
  }

  getPurchaseHistories(): Array<PurchaseHistory> {
    const histories: string | null = localStorage.getItem(this.storageKey);
    return histories ? JSON.parse(histories) : [];
  }

  getPurchaseHistoriesLocalStorageKey(): string {
    return this.storageKey;
  }

  updatePurchaseHistories(purchaseHistories: Array<PurchaseHistory>) {
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistories));
  }
}