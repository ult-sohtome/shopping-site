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
      const nowDate: string = new Date().toISOString().split("T")[0];
      const existingSameDateProduct: PurchaseProduct | undefined = this.purchaseHistory.find(purchasedProduct =>
        purchasedProduct.product.id === product.id && purchasedProduct.purchasedAt === nowDate
      );
      if (existingSameDateProduct) {
        existingSameDateProduct.quantity += 1;
        repository.addPurchaseHistory(existingSameDateProduct);
      } else {
        const purchaseProduct: PurchaseProduct = {
          product: {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
          },
          rate,
          quantity: 1,
          purchasedAt: new Date().toISOString().split("T")[0]
        };
        this.purchaseHistory.push(purchaseProduct);
        repository.addPurchaseHistory(purchaseProduct);
      }
    }
  }
});