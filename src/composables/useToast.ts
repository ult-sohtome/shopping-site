import { ref } from 'vue';

export function useToast() {
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastX = ref(0);
  const toastY = ref(0);

  const showAddToCartToast = (message: string, x: number, y: number) => {
    toastMessage.value = message;
    toastX.value = x;
    toastY.value = y;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 1000);
  };

  return {
    toastMessage,
    toastX,
    toastY,
    showToast,
    showAddToCartToast,
  };
}