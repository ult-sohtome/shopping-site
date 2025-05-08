<script lang="ts">
import { ref, onMounted, defineComponent, type PropType } from 'vue';
import type { Product, ProductRepositoryInterface, ProductWithYen } from '@/interfaces/ProductRepositoryInterface';
import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { convertToYen } from '@/utils/priceFormatter';
import { useRouter } from 'vue-router';
import { ApiRateRepository } from '@/repositories/ApiRateRepository';
import { useRateStore } from '@/stores/rate';

export default defineComponent({
  name: 'ProductListView',
  props: {
    productRepository: {
      type: Object as PropType<ProductRepositoryInterface>,
      required: false,
      default: () => new ApiProductRepository(),
    },
    rateRepository: {
      type: Object as PropType<ApiRateRepository>,
      required: false,
      default: () => new ApiRateRepository(),
    }
  },
  setup(props) {
    const products = ref<Product[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const router = useRouter();
    const rateStore = useRateStore();
    const rate = ref<number>(0);
    const handleDetailClick = (productId: number) => {
      router.push(`/product/${productId}`);
    }

    onMounted(async () => {
      try {
        await rateStore.initializeRate(props.rateRepository);
        if (rateStore.jpyRate === null) {
          throw new Error('JPYレートが取得できませんでした。');
        }
        rate.value = rateStore.jpyRate as number;
        const response = await props.productRepository.getAllProducts();
        products.value = response;
      } catch (e: any) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      products,
      loading,
      error,
      convertToYen,
      handleDetailClick,
      rate,
    }
  }
});
</script>

<template>
  <main>
    <h1>商品一覧</h1>
    <div v-if="loading" class="message">商品データ読み込み中...</div>
    <div v-else-if="error" class="message">{{ error }}</div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" alt="商品画像" width="50" />
        <h2>{{ product.title }}</h2>
        <p>価格: {{ convertToYen(product.price, rate).toLocaleString() }}円</p>
        <button @click="handleDetailClick(product.id)">詳細を見る</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  margin: 1em;
  padding: 1em;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.message {
  text-align: center;
  font-size: 1.2rem;
}

</style>