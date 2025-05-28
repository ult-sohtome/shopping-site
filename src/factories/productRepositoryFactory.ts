import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { StubProductRepository } from '@/repositories/StubProductRepository';
import type { ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';

export function createProductRepository(isUseStub: boolean): ProductRepositoryInterface {
  return isUseStub
    ? new StubProductRepository()
    : new ApiProductRepository();
}
