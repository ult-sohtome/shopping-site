import { createProductRepository } from '@/factories/productRepositoryFactory';
import type { ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';
import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { StubProductRepository } from '@/repositories/StubProductRepository';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductRepositoryStore = defineStore('ProductRepository', () => {
  const isUseStub = ref(import.meta.env.VITE_USE_PRODUCT_STUB === 'true');
  const productRepository = ref<ProductRepositoryInterface>(createProductRepository());

  const toggleProductRepository = () => {
    isUseStub.value = !isUseStub.value;
    productRepository.value = isUseStub.value
      ? new StubProductRepository()
      : new ApiProductRepository();
  };

  return {
    isUseStub,
    productRepository,
    toggleProductRepository
  };
});