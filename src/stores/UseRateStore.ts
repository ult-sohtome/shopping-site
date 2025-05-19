import { defineStore } from 'pinia';
import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';

type State = {
  jpyRate: number | null;
};

export const useRateStore = defineStore('rate', {
  state: (): State => ({
    jpyRate: null,
  }),
  getters: {
    formattedRate(): number {
      if (this.jpyRate === null) {
        throw new Error('JPYレートが取得できませんでした。');
      }
      return this.jpyRate;
    }
  },
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
