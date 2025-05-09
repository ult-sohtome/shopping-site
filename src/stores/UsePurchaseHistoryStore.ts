import { defineStore } from "pinia";
import type { PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { Product } from "@/interfaces/ProductRepositoryInterface";

type PurchaseProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type State = {
  purchaseHistory: Array<PurchaseProduct>;
};

export const usePurchaseHistoryStore = defineStore("purchaseHistory", {
  state: (): State => ({
    purchaseHistory: []
  }),
  actions: {
    addPurchaseHistory(product: Product, repository: PurchaseHistoryRepositoryInterface) {
      const purchaseProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      };
      this.purchaseHistory.push(purchaseProduct);

      repository.addPurchaseHistory(purchaseProduct);
    }
  }
});