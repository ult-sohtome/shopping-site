<script setup lang="ts">
import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
import { convertToYen, formatDate } from '@/utils/priceFormatter';
import type { ProductEntry } from '@/interfaces/ProductEntry';

const purchaseHistoryStore = usePurchaseHistoryStore();

const calcTotalAmount = (productOrders: Array<ProductEntry>, rate: number): number => {
  return productOrders.reduce((total, productEntry) => {
    return total + convertToYen(productEntry.product.price, rate) * productEntry.quantity;
  }, 0);
};

</script>

<template>
  <div class="purchase-history">
    <h1>購入履歴</h1>
    <div class="purchase-history-list">
      <div v-for="(purchaseHistory, historyIndex) in purchaseHistoryStore.purchaseHistories" :key="historyIndex" class="purchase-history-item">
        <p>購入日時: {{ formatDate(purchaseHistory.purchasedAt) }}</p>
        <p>購入商品:</p>
        <ul>
          <li v-for="(productEntry, productOrderIndex) in purchaseHistory.productOrders" :key="productOrderIndex">
            <p>商品名:{{ productEntry.product.title }}</p>
            <p>単価:{{ convertToYen(productEntry.product.price, purchaseHistory.rate).toLocaleString() }}円</p>
            <p>購入個数:{{ productEntry.quantity }}個</p>
          </li>
        </ul>
        <div class="border"></div>
        <p>合計金額: {{ calcTotalAmount(purchaseHistory.productOrders, purchaseHistory.rate).toLocaleString() }}円</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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