import { defineStore } from "pinia";
import type { PurchaseProduct, PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { Product } from "@/interfaces/ProductRepositoryInterface";

type State = {
  purchaseHistory: Array<PurchaseProduct>;
};

export const usePurchaseHistoryStore = defineStore("purchaseHistory", {
  state: (): State => ({
    purchaseHistory: []
  }),
  actions: {
    addPurchaseHistory(product: Product, rate: number, repository: PurchaseHistoryRepositoryInterface) {
      const purchaseProduct: PurchaseProduct = {
        productOrders: [
          { product: {
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image
            },
            quantity: 1
          }
        ],
        rate,
        purchasedAt: new Date().toISOString()
      };

      this.purchaseHistory.push(purchaseProduct);
      repository.addPurchaseHistory(purchaseProduct);
    }
  }
});