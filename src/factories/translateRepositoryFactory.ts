// src/factories/translateRepositoryFactory.ts
import { ApiTranslateRepository } from '@/repositories/ApiTranslateRepository';
import { StubTranslateRepository } from '@/repositories/StubTranslateRepository';
import type { TranslateRepositoryInterface } from '@/interfaces/TranslateRepositoryInterface';

export function createTranslateRepository(): TranslateRepositoryInterface {
  const isUseStub: boolean = import.meta.env.VITE_USE_TRANSLATE_STUB === 'true';
  return isUseStub
    ? new StubTranslateRepository()
    : new ApiTranslateRepository();
}
