import { LocalStoragePurchaseHistoryRepository } from "@/repositories/LocalStoragePurchaseHistoryRepository";
import type { PurchaseHistory } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { ProductEntry } from "@/interfaces/ProductEntry";

export class PurchaseHistoryMigration_20250521 {
  constructor() {
    const localStoragePurchaseHistoriesKey: string = new LocalStoragePurchaseHistoryRepository().getPurchaseHistoriesLocalStorageKey();
    this.migratePurchaseHistory(localStoragePurchaseHistoriesKey);
  }

  private migratePurchaseHistory(key: string) {
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData) {
      throw new Error("購入履歴データが存在しません。");
    };
    const purchaseHistories = JSON.parse(localStorageData);

    const migratedPurchaseHistories = purchaseHistories.map((purchaseHistory: PurchaseHistory) => {
      const updatedProductOrders = purchaseHistory.productOrders.map((productEntry: ProductEntry) => ({
        ...productEntry,
        deletedAt: null
      }));
      return {
        ...purchaseHistory,
        productOrders: updatedProductOrders
      };
    });

    localStorage.setItem(key, JSON.stringify(migratedPurchaseHistories));
  }
}