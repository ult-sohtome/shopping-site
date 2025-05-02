<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import type { Product } from '@/interfaces/ProductRepository';
import { ApiProductRepository } from '@/repositories/ApiProductRepository';
import { convertToYen } from '@/utils/priceFormatter';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProductListView',
  setup() {
    const products = ref<Product[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const repository = new ApiProductRepository();
    const router = useRouter();

    const handleDetailClick = (productId: number) => {
      router.push(`/product/${productId}`);
    }

    onMounted(async () => {
      try {
        products.value = await repository.getAllProducts();
      } catch (e) {
        error.value = (e as Error).message;
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
        <p>価格: {{ convertToYen(product.price).toLocaleString() }}円</p>
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