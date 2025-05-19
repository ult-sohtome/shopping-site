import type { TranslateRepositoryInterface } from '@/interfaces/TranslateRepositoryInterface.ts'

export class StubTranslateRepository implements TranslateRepositoryInterface {
  async translateToJapanese(texts: Array<string>): Promise<Array<string>> {
    return texts.map(text => `日本語翻訳テスト：${text}`);
  }
}
