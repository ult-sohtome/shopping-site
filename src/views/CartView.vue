<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { ApiProductRepository } from '@/repositories/ApiProductRepository';
  import { ApiRateRepository } from '@/repositories/ApiRateRepository';
  import { ApiTranslateRepository } from '@/repositories/ApiTranslateRepository';
  import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository';
  import { useRateStore } from '@/stores/UseRateStore';
  import { convertToYen } from '@/utils/priceFormatter';
  import { useCartStore } from '@/stores/UseCartStore';
  import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
  import type { Product, ProductRepositoryInterface } from '@/interfaces/ProductRepositoryInterface';
  import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';
  import type { TranslateRepositoryInterface } from '@/interfaces/TranslateRepositoryInterface';
  import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';
  import type { ProductEntry } from '@/interfaces/ProductEntry';


const props = withDefaults(defineProps<{
    productRepository?: ProductRepositoryInterface;
    rateRepository?: RateRepositoryInterface;
    purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface;
    translateRepository?: TranslateRepositoryInterface;
  }>(), {
    productRepository: () => new ApiProductRepository(),
    rateRepository: () => new ApiRateRepository(),
    purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository(),
    translateRepository: () => new ApiTranslateRepository(),
  });

  const rateStore = useRateStore();
  const cartStore = useCartStore();
  const purchaseHistoryStore = usePurchaseHistoryStore();
  const loading = ref(true);
  const error = ref<string | null>(null);
  const rate = ref<number>(0);
  const cartItems = ref<Array<ProductEntry>>([]);
  
  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + convertToYen(item.product.price, rate.value) * item.quantity;
    }, 0);
  });

  const handleRemoveProductFromCartClick = (productId: number) => {
    cartStore.removeProductFromCart(productId);
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  }

  const handleBuyAllProductFromCartClick = () => {
    purchaseHistoryStore.addPurchareHistoryFromCart(cartItems.value, rate.value, props.purchaseHistoryRepository);
    cartStore.clearCart();
    cartItems.value = [];
  }

  onMounted(async () => {
    try {
      await rateStore.initializeRate(props.rateRepository);
      if (rateStore.jpyRate === null) {
        throw new Error('JPYレートが取得できませんでした。');
      }
      rate.value = rateStore.jpyRate;

      cartItems.value = await Promise.all(
        cartStore.getAllProductToCart().map(async (item) => {
          const product: Product | null = await props.productRepository.getProductById(item.productId);
          if (product === null) {
            throw new Error('カート内の商品情報が得られませんでした。');
          }
          return {
            product: {
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image
            },
            quantity: item.quantity
          };
        })
      );
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div class="cart">
    <h1>カート一覧</h1>
    <div v-if="loading" class="message">カート商品データ読み込み中...</div>
    <div v-else-if="error" class="message">{{ error }}</div>
    <div v-else-if="cartItems.length === 0" class="message">カートに商品がありません。</div>
    <div v-else-if="cartItems" class="cart-items">
      <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
        <img :src="item.product.image" alt="商品画像" width="100"/>
        <div class="cart-item-details">
          <h2>{{ item.product.title }}</h2>
          <p>Price: {{ convertToYen(item.product.price, rate).toLocaleString() }}円</p>
          <p>Quantity: {{ item.quantity }}</p>
          <button @click="handleRemoveProductFromCartClick(item.product.id)">削除</button>
        </div>
      </div>
    </div>
    <div class="border"></div>
    <div v-if="totalPrice > 0" class="cart-total">
      <h2>合計金額: {{ totalPrice.toLocaleString() }}円</h2>
      <button @click="handleBuyAllProductFromCartClick()">全て購入する</button>
    </div>
  </div>
</template>

<style scoped>
  .message {
    text-align: center;
    font-size: 1.2rem;
  }

  .cart-item {
    margin: 10px;
  }

  .border {
    border: 1px solid #414141;
    margin: 10px;
  }
</style>