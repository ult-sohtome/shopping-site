<script setup lang="ts">
import { computed, ref } from 'vue';
import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository';
import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
import { convertToYen } from '@/utils/priceFormatter';
import { formatDate } from '@/utils/dateFormatter';
import type { PurchaseHistory, PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';
import type { PurchasedProductEntry } from '@/interfaces/ProductEntry';

  const props = withDefaults(defineProps<{
    purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface;
  }>(), {
    purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository()
  });

const purchaseHistoryStore = usePurchaseHistoryStore();
const showCanceled = ref(false);

const handleCancelProductClick = (historyId: number, productEntry: PurchasedProductEntry) => {
  if (productEntry.deletedAt !== null) return;
  purchaseHistoryStore.deletePurchased(historyId, productEntry, props.purchaseHistoryRepository);
};

const calcTotalAmount = (productOrders: Array<PurchasedProductEntry>, rate: number): number => {
  return productOrders.filter(productEntry => productEntry.deletedAt === null).reduce((total, productEntry) => {
    return total + convertToYen(productEntry.product.price, rate) * productEntry.quantity;
  }, 0);
};

const displayedHistories = computed<Array<PurchaseHistory>>(() => {
  const sortedPurchaseHistories = [...purchaseHistoryStore.purchaseHistories].sort((a, b) => {
    return new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime();
  });

  if (showCanceled.value) {
    return sortedPurchaseHistories;
  }
  return sortedPurchaseHistories
    .map(purchaseHistory => {
      const filteredProductOrders = purchaseHistory.productOrders.filter(productEntry => productEntry.deletedAt === null);
      return {
        ...purchaseHistory,
        productOrders: filteredProductOrders
      };
    })
    .filter(purchaseHistory => purchaseHistory.productOrders.length > 0);
});

</script>

<template>
  <div class="purchase-history">
    <h1>購入履歴</h1>
    <div>
      <label class="radio-label"><input type="radio" :value="false" v-model="showCanceled">通常の購入履歴</label>
      <label><input type="radio" :value="true" v-model="showCanceled">キャンセルした購入商品も含めた購入履歴</label>
    </div>
    <div class="purchase-history-list">
      <div v-for="purchaseHistory in displayedHistories" :key="purchaseHistory.id" class="purchase-history-item">
        <p>購入日時: {{ formatDate(purchaseHistory.purchasedAt) }}</p>
        <p>購入商品:</p>
        <ul>
          <li v-for="productEntry in purchaseHistory.productOrders" :key="productEntry.id">
            <p>商品名:{{ productEntry.product.title }}</p>
            <p>単価:{{ convertToYen(productEntry.product.price, purchaseHistory.rate).toLocaleString() }}円</p>
            <p>購入個数:{{ productEntry.quantity }}個</p>
            <p v-if="productEntry.deletedAt">キャンセル日時:{{ formatDate(productEntry.deletedAt) }}</p>
            <button v-if="productEntry.deletedAt === null" @click="handleCancelProductClick(purchaseHistory.id, productEntry)">購入キャンセル</button>
          </li>
        </ul>
        <div class="border"></div>
        <p>合計金額: {{ calcTotalAmount(purchaseHistory.productOrders, purchaseHistory.rate).toLocaleString() }}円</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .radio-label {
    margin-right: 20px;
  }
  .purchase-history-item {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid black;
  }
  .border {
    border: 1px solid #414141;
    margin: 10px;
  }
</style>