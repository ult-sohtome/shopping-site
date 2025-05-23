import { defineStore } from "pinia";
import type { PurchaseHistory, PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import type { Product } from "@/interfaces/ProductRepositoryInterface";
import type { ProductEntry } from "@/interfaces/ProductEntry";

type State = {
  purchaseHistories: Array<PurchaseHistory>;
};

export const usePurchaseHistoryStore = defineStore("purchaseHistories", {
  state: (): State => ({
    purchaseHistories: []
  }),
  actions: {
    addPurchaseHistory(product: Product, rate: number, repository: PurchaseHistoryRepositoryInterface) {
      const purchaseProduct: PurchaseHistory = {
        historyId: this.purchaseHistories.length + 1,
        productOrders: [
          { 
            entryId: 1,
            product: {
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image
            },
            quantity: 1,
            deletedAt: null
          }
        ],
        rate,
        purchasedAt: new Date().toISOString()
      };

      this.purchaseHistories.push(purchaseProduct);
      repository.addPurchaseHistory(purchaseProduct);
    },
    addPurchareHistoryFromCart(cartItems: Array<ProductEntry>, rate: number, repository: PurchaseHistoryRepositoryInterface) {
      const purchaseProduct: PurchaseHistory = {
        historyId: this.purchaseHistories.length + 1,
        productOrders: cartItems.map(item => ({
          entryId: cartItems.indexOf(item) + 1,
          product: item.product,
          quantity: item.quantity,
          deletedAt: null
        })),
        rate,
        purchasedAt: new Date().toISOString()
      };

      this.purchaseHistories.push(purchaseProduct);
      repository.addPurchaseHistory(purchaseProduct);
    },
    initializePurchaseHistory(purchaseHistories: Array<PurchaseHistory>) {
      this.purchaseHistories = purchaseHistories;
    },
    deletePurchased(historyId: number, productEntry: ProductEntry, repository: PurchaseHistoryRepositoryInterface) {
      const targetPurchaseHistory = this.purchaseHistories.find(purchaseHistory => purchaseHistory.historyId === historyId);

      if (!targetPurchaseHistory) {
        throw new Error("指定された商品の購入履歴が見つかりませんでした");
      }

      const targetProductEntry = targetPurchaseHistory.productOrders.find(entry => entry.entryId === productEntry.entryId);

      if (!targetProductEntry) {
        throw new Error("キャンセルする商品が見つかりませんでした");
      }

      targetProductEntry.deletedAt = new Date().toISOString();
      repository.updatePurchaseHistories(this.purchaseHistories);
    }
  }
});