export interface RateRepositoryInterface {
  fetchRateForYen(): Promise<number>;
}