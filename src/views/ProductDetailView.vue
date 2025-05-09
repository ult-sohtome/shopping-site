<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ApiProductRepository } from '@/repositories/ApiProductRepository';
  import { ApiRateRepository } from '@/repositories/ApiRateRepository';
  import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository';
  import { useRateStore } from '@/stores/UseRateStore';
  import{ useRoute } from 'vue-router';
  import { convertToYen } from '@/utils/priceFormatter';
  import { useCartStore } from '@/stores/UseCartStore';
  import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
  import type { Product, ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';
  import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';
  import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';

  const props = withDefaults(defineProps<{
    productRepository?: ProductRepositoryInterface;
    rateRepository?: RateRepositoryInterface;
    purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface;
  }>(), {
    productRepository: () => new ApiProductRepository(),
    rateRepository: () => new ApiRateRepository(),
    purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository(),
  });

  const route = useRoute();
  const product = ref<Product | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const rateStore = useRateStore();
  const rate = ref<number>(0);

  const handleAddProductToCartClick = (product: Product) => {
    const cartStore = useCartStore();
    cartStore.addProductToCart(product.id);
  }
  const handleBuyProductClick = (product: Product) => {
    const purchaseHistoryStore = usePurchaseHistoryStore();
    purchaseHistoryStore.addPurchaseHistory(product, props.purchaseHistoryRepository);
  }

  onMounted(async () => {
    try {
      await rateStore.initializeRate(props.rateRepository);
      if (rateStore.jpyRate === null) {
        throw new Error('JPYレートが取得できませんでした。');
      }
      rate.value = rateStore.jpyRate;
      const productId = Number(route.params.id);
      product.value = await props.productRepository.getProductById(productId); 
      if (product.value === null) {
        throw new Error('商品が見つかりませんでした。');
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <main>
    <h1>商品詳細</h1>
    <div v-if="loading" class="message">商品データ読み込み中...</div>
    <div v-else-if="error" class="message">{{ error }}</div>
    <div v-else-if="product">
      <img :src="product.image" alt="商品画像" width="100" />
      <h2>{{ product.title }}</h2>
      <p>価格: {{ convertToYen(product.price, rate).toLocaleString() }}円</p>
      <p>説明: {{ product.description }}</p>
      <p>カテゴリ: {{ product.category }}</p>
      <button @click="handleAddProductToCartClick(product)">カートに追加</button>
      <button @click="handleBuyProductClick(product)">購入</button>
    </div>
    <div v-else class="message">商品が見つかりませんでした。</div>
  </main>
</template>