export interface TranslateRepositoryInterface {
  translateToJapanese(text: Array<string>): Promise<Array<string>>;
}