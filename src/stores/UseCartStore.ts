import { defineStore } from 'pinia';

type State = {
  cartItems: Array<{ productId: number, quantity: number }>;
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
        this.cartItems.push({ productId, quantity: 1 });
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