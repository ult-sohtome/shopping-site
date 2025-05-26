import type { PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { PurchaseHistory } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { PurchasedProductEntry } from "@/interfaces/ProductEntry";

export class PurchaseHistoryMigration_20250521 {
  private purchaseHistoryRepository: PurchaseHistoryRepositoryInterface;

  constructor(repository: PurchaseHistoryRepositoryInterface) {
    this.purchaseHistoryRepository = repository;
    this.migratePurchaseHistory();
  }

  private migratePurchaseHistory() {
    const purchaseHistories: Array<PurchaseHistory> = this.purchaseHistoryRepository.getPurchaseHistories();
    if (!purchaseHistories) {
      throw new Error("購入履歴データが存在しません。");
    };

    const migratedPurchaseHistories: Array<PurchaseHistory> = purchaseHistories.map((purchaseHistory: PurchaseHistory) => {
      const updatedProductOrders = purchaseHistory.productOrders.map((productEntry: PurchasedProductEntry) => ({
        ...productEntry,
        deletedAt: null,
        id: purchaseHistory.productOrders.indexOf(productEntry) + 1,
      }));
      return {
        ...purchaseHistory,
        id: purchaseHistories.indexOf(purchaseHistory) + 1,
        productOrders: updatedProductOrders
      };
    });

    this.purchaseHistoryRepository.updatePurchaseHistories(migratedPurchaseHistories);
  }
}