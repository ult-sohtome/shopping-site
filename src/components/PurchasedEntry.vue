<script setup lang="ts">
import { computed } from 'vue';
import { convertToYen } from '@/utils/priceFormatter';
import { formatDate } from '@/utils/dateFormatter';
import type { PurchasedProductEntry } from '@/interfaces/ProductEntry';
import type { PurchaseHistory } from '@/interfaces/PurchaseHistoryRepositoryInterface';

const props = defineProps<{
  productEntry: PurchasedProductEntry;
  purchaseHistory: PurchaseHistory;
}>();

const emit = defineEmits<{
  (e: 'cancelProduct', historyId: number, productEntry: PurchasedProductEntry): void;
}>();

const isDeleted = computed(() => props.productEntry.deletedAt !== null);
const unitPrice = computed(() => 
  convertToYen(props.productEntry.product.price, props.purchaseHistory.rate).toLocaleString()
);
const canceledAt = computed(() =>
  props.productEntry.deletedAt ? formatDate(props.productEntry.deletedAt) : ''
);

const handleCancelProductClick = (historyId: number, productEntry: PurchasedProductEntry) => {
  if (isDeleted.value) return;
  emit('cancelProduct', historyId, productEntry);
};
</script>

<template>
  <p>商品名:{{ productEntry.product.title }}</p>
  <p>単価:{{ unitPrice }}円</p>
  <p>購入個数:{{ productEntry.quantity }}個</p>
  <p v-if="isDeleted">キャンセル日時:{{ canceledAt }}</p>
  <button v-if="!isDeleted" @click="handleCancelProductClick(purchaseHistory.id, productEntry)">購入キャンセル</button>
</template>