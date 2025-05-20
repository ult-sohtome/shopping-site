<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ApiProductRepository } from '@/repositories/ApiProductRepository';
  import { ApiRateRepository } from '@/repositories/ApiRateRepository';
  import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository';
  import { createTranslateRepository } from '@/factories/translateRepositoryFactory'
  import { useRateStore } from '@/stores/UseRateStore';
  import{ useRoute } from 'vue-router';
  import { convertToYen } from '@/utils/priceFormatter';
  import { useCartStore } from '@/stores/UseCartStore';
  import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
  import Toast from '@/components/commom/Toast.vue';
  import { useToast } from '@/composables/useToast';
  import type { Product, ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';
  import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';
  import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';
  import type { TranslateRepositoryInterface } from '@/interfaces/TranslateRepositoryInterface';

  const props = withDefaults(defineProps<{
    productRepository?: ProductRepositoryInterface;
    rateRepository?: RateRepositoryInterface;
    purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface;
    translateRepository?: TranslateRepositoryInterface;
  }>(), {
    productRepository: () => new ApiProductRepository(),
    rateRepository: () => new ApiRateRepository(),
    purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository(),
    translateRepository: () => createTranslateRepository(),
  });

  const route = useRoute();
  const product = ref<Product | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const rateStore = useRateStore();
  const cartStore = useCartStore();
  const purchaseHistoryStore = usePurchaseHistoryStore();
  const rate = ref<number>(0);
  const translatedProduct = ref<Product | null>(null);
  const {
    showToast,
    toastMessage,
    toastX,
    toastY,
    showAddToCartToast
  } = useToast();

  const handleAddProductToCartClick = (product: Product | null, event: MouseEvent) => {
    if (!product) return;
    cartStore.addProductToCart(product.id);
    showAddToCartToast("カートに追加しました", event.clientX, event.clientY);
  }
  const handleBuyProductClick = (product: Product) => {
    purchaseHistoryStore.addPurchaseHistory(product, rate.value, props.purchaseHistoryRepository);
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

      const translatedTexts: Array<string> | null = await props.translateRepository.translateToJapanese([
        product.value.title,
        product.value.description,
        product.value.category
      ]);
      if (translatedTexts.length !== 3) {
        throw new Error('翻訳に失敗しました。');
      }
      translatedProduct.value = {
        ...product.value,
        title: translatedTexts[0],
        description: translatedTexts[1],
        category: translatedTexts[2]
      };

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
      <div v-if="translatedProduct">
        <h2>{{ translatedProduct.title }}</h2>
        <p>価格: {{ convertToYen(product.price, rate).toLocaleString() }}円</p>
        <p>説明: {{ translatedProduct.description }}</p>
        <p>カテゴリ: {{ translatedProduct.category }}</p>
      </div>
      <br />
      <div>
        <h2>{{ product.title }}</h2>
        <p>Price: {{ product.price }}$</p>
        <p>Description: {{ product.description }}</p>
        <p>Category: {{ product.category }}</p>
      </div>
      <br />
      <div>
        <button @click="event => handleAddProductToCartClick(product, event)">カートに追加</button>
        <button @click="handleBuyProductClick(product)">購入</button>
      </div>
    </div>
    <div v-else class="message">商品が見つかりませんでした。</div>
    <Toast
      :showToast="showToast"
      :toastMessage="toastMessage"
      :toastX="toastX"
      :toastY="toastY"
      @update:showToast="showToast = $event"
    />
  </main>
</template>
