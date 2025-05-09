import { defineStore } from "pinia";
import type { PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { Product } from "@/interfaces/ProductRepositoryInterface";

type State = {
  purchaseHistory: Array<Product>;
};

export const usePurchaseHistoryStore = defineStore("purchaseHistory", {
  state: (): State => ({
    purchaseHistory: []
  }),
  actions: {
    async addPurchaseHistory(product: Product, repository: PurchaseHistoryRepositoryInterface) {
      this.purchaseHistory.push(product);

      await repository.addPurchaseHistory(product);
    }
  }
});