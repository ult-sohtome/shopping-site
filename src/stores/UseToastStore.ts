import { defineStore } from "pinia";

let timerId: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = defineStore("cartToast", {
  state: () => ({
    showToast: false,
    toastMessage: "",
    toastX: 0,
    toastY: 0
  }),
  actions: {
    showCartToast(message: string, x: number, y: number) {
      if (timerId) {
        clearTimeout(timerId);
        this.hideCartToast();
      }
      this.toastMessage = message;
      this.toastX = x;
      this.toastY = y;
      this.showToast = true;
      timerId = setTimeout(() => {
        this.hideCartToast();
        timerId = null;
      }, 1000);
    },
    hideCartToast() {
      this.showToast = false;
    }
  }
});