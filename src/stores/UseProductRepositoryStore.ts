import { createProductRepository } from '@/factories/productRepositoryFactory';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductRepositoryStore = defineStore('ProductRepository', () => {
  const isUseStub = ref(import.meta.env.VITE_DEFAULT_USE_PRODUCT_STUB === 'true');
  const productRepository = computed(() => createProductRepository());

  const toggleProductRepository = () => isUseStub.value = !isUseStub.value;

  return {
    isUseStub,
    productRepository,
    toggleProductRepository
  };
});