import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Array<{ id: number }>,
  }),
  actions: {
    async addProductToCart(productId: number) {
      this.cartItems.push({ id: productId });
    }
  }
});