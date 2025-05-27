<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '@/interfaces/ProductRepositoryInterface';
import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';
import { convertToYen } from '@/utils/priceFormatter';
import { useRouter } from 'vue-router';
import { ApiRateRepository } from '@/repositories/ApiRateRepository';
import { useRateStore } from '@/stores/UseRateStore';
import { useProductRepositoryStore } from '@/stores/UseProductRepositoryStore';
import { useCartStore } from '@/stores/UseCartStore';
import ConfirmDialog from '@/components/commom/ConfirmDialog.vue';

const props = withDefaults(defineProps<{
  rateRepository?: RateRepositoryInterface;
}>(), {
  rateRepository: () => new ApiRateRepository()
});

const cartStore = useCartStore();
const productRepositoryStore = useProductRepositoryStore();
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const router = useRouter();
const rateStore = useRateStore();
const rate = ref<number>(0);
const showConfirmDialog = ref(false);

const handleDetailClick = (productId: number) => {
  router.push(`/product/${productId}`);
}

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    await rateStore.initializeRate(props.rateRepository);
    if (rateStore.jpyRate === null) {
      throw new Error('JPYレートが取得できませんでした。');
    }
    rate.value = rateStore.jpyRate;
    const response = await productRepositoryStore.productRepository.getAllProducts();
    products.value = response;
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const handleShowConfirmDialog = () => {
  showConfirmDialog.value = true;
};

const executeRepositorySwitch = () => {
  showConfirmDialog.value = false;
  cartStore.clearCart();
  productRepositoryStore.toggleProductRepository();
  fetchProducts();
};

const cancelRepositorySwitch = () => {
  showConfirmDialog.value = false;
};

onMounted(fetchProducts);
</script>

<template>
  <header>
    <button @click="handleShowConfirmDialog">
      {{ productRepositoryStore.isUseStub ? '本番商品APIに切り替え' : '商品スタブに切り替え' }}
    </button>
  </header>
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
    <ConfirmDialog
      v-if="showConfirmDialog"
      :isDialogVisible="showConfirmDialog"
      dialogMessage="カート内の商品は全て削除されます。切り替えを実行しますか？"
      @confirm="executeRepositorySwitch"
      @cancel="cancelRepositorySwitch"
    />
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