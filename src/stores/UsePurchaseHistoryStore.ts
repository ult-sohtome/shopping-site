import { defineStore } from "pinia";
import type { PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";

type State = {
  purchaseHistory: Array<{
    id: number;
    productId: number;
  }>;
};

export const usePurchaseHistoryStore = defineStore("purchaseHistory", {
  state: (): State => ({
    purchaseHistory: []
  }),
  actions: {
    async addPurchaseHistory(productId: number, repository: PurchaseHistoryRepositoryInterface) {
      this.purchaseHistory.push({
        id: this.purchaseHistory.length + 1,
        productId
      });

      await repository.addPurchaseHistory(productId);
    }
  }
});