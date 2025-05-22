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
        productOrders: [
          { product: {
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
        productOrders: cartItems.map(item => ({
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
    initializePurchaseHistory(repository: PurchaseHistoryRepositoryInterface) {
      const purchaseHistories = repository.getPurchaseHistories();
      this.purchaseHistories = purchaseHistories;
    }
  }
});