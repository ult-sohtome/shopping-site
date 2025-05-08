import type { RateRepositoryInterface } from "../interfaces/RateRepositoryInterface";

export class ApiRateRepository implements RateRepositoryInterface {
  async fetchRateForYen(): Promise<number> {
    const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json");
    const data = await response.json();
    return data.usd.jpy;
  }
}

