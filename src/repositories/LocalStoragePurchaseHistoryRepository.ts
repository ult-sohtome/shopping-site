import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';
import type { Product } from '@/interfaces/ProductRepositoryInterface';

export class LocalStoragePurchaseHistoryRepository implements PurchaseHistoryRepositoryInterface {
  private readonly storageKey = 'purchaseHistory';

  async addPurchaseHistory(product: Product): Promise<void> {
    const purchaseHistory = this.getPurchaseHistory();
    purchaseHistory.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(purchaseHistory));
  }

  getPurchaseHistory(): Array<Product> {
    const history = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }
}