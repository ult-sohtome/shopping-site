import { defineStore } from 'pinia';
import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';

type State = {
  jpyRate: number | null;
};

export const useRateStore = defineStore('rate', {
  state: (): State => ({
    jpyRate: null,
  }),
  actions: {
    async loadRateForYen(repository: RateRepositoryInterface) {
      this.jpyRate = await repository.fetchRateForYen();
    },
    async initializeRate(repository: RateRepositoryInterface) {
      if (this.jpyRate === null) {
        await this.loadRateForYen(repository);
      }
    }
  }
});