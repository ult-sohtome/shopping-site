import { defineStore } from 'pinia';

type State = {
  cartItems: Array<{ entryId: number, productId: number, quantity: number }>;
};

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    cartItems: [],
  }),
  actions: {
    addProductToCart(productId: number) {
      const existingItem = this.cartItems.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const entryId: number = this.cartItems.length > 0 ? this.cartItems[this.cartItems.length - 1].entryId + 1 : 1;
        this.cartItems.push({ entryId, productId, quantity: 1 });
      }
    },
    removeProductFromCart(productId: number) {
      const index = this.cartItems.findIndex(item => item.productId === productId);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    clearCart() {
      this.cartItems = [];
    }
  }
});