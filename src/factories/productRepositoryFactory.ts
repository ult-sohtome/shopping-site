import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { StubProductRepository } from '@/repositories/StubProductRepository';
import type { ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';

export function createProductRepository(): ProductRepositoryInterface {
  const isUseStub: boolean = import.meta.env.VITE_USE_PRODUCT_STUB === 'true';
  return isUseStub
    ? new StubProductRepository()
    : new ApiProductRepository();
}
