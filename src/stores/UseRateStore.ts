import { defineStore } from 'pinia';
import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';

export const useRateStore = defineStore('rate', {
  state: () => ({
    jpyRate: null as number | null
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