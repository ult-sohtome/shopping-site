import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { StubProductRepository } from '@/repositories/StubProductRepository';
import type { ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';
import { useProductRepositoryStore } from '@/stores/UseProductRepositoryStore';

export function createProductRepository(): ProductRepositoryInterface {
  const productRepositoryStore = useProductRepositoryStore();

  return productRepositoryStore.isUseStub
    ? new StubProductRepository()
    : new ApiProductRepository();
}
