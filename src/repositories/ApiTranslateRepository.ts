import type { TranslateRepositoryInterface } from "@/interfaces/TranslateRepositoryInterface";

export class ApiTranslateRepository implements TranslateRepositoryInterface {
  async translateToJapanese(texts: Array<string>): Promise<Array<string>> {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, to: 'ja' })
    });

    if (!response.ok) {
      throw new Error('翻訳に失敗しました。');
    }
    const data = await response.json();
    return data.translatedTexts;
  }
}