<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { ApiRateRepository } from '@/repositories/ApiRateRepository';
import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository';
import { useRateStore } from '@/stores/UseRateStore';
import { convertToYen } from '@/utils/priceFormatter';
import { useCartStore } from '@/stores/UseCartStore';
import { usePurchaseHistoryStore } from '@/stores/UsePurchaseHistoryStore';
import { useProductRepositoryStore } from '@/stores/UseProductRepositoryStore';
import type { Product } from '@/interfaces/ProductRepositoryInterface';
import type { RateRepositoryInterface } from '@/interfaces/RateRepositoryInterface';
import type { TranslateRepositoryInterface } from '@/interfaces/TranslateRepositoryInterface';
import type { PurchaseHistoryRepositoryInterface } from '@/interfaces/PurchaseHistoryRepositoryInterface';
import type { CartProductEntry } from '@/interfaces/ProductEntry';
import { createTranslateRepository } from '@/factories/translateRepositoryFactory';

const props = withDefaults(defineProps<{
    rateRepository?: RateRepositoryInterface;
    purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface;
    translateRepository?: TranslateRepositoryInterface;
  }>(), {
    rateRepository: () => new ApiRateRepository(),
    purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository(),
    translateRepository: () => createTranslateRepository(),
  });

  const productRepositoryStore = useProductRepositoryStore();
  const rateStore = useRateStore();
  const cartStore = useCartStore();
  const purchaseHistoryStore = usePurchaseHistoryStore();
  const loading = ref(true);
  const error = ref<string | null>(null);
  const cartItems = ref<Array<CartProductEntry>>([]);

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + convertToYen(item.product.price, rateStore.formattedRate) * item.quantity;
    }, 0);
  });

  const handleRemoveProductFromCartClick = (productId: number) => {
    cartStore.removeProductFromCart(productId);
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  }

  const handleBuyAllProductFromCartClick = () => {
    purchaseHistoryStore.addPurchareHistoryFromCart(cartItems.value, rateStore.formattedRate, props.purchaseHistoryRepository);
    cartStore.clearCart();
    cartItems.value = [];
  }

  const updateCartItems = async () => {
    const newCartStoreItems = [...cartStore.cartItems];
    const updatedCartItems: Array<CartProductEntry> = [];

    for (const storeItem of newCartStoreItems) {
      const existing: CartProductEntry | undefined = cartItems.value.find(cartItem => cartItem.product.id === storeItem.productId);
      if (existing) {
        existing.quantity = storeItem.quantity;
        updatedCartItems.push(existing);
      } else {
        const product: Product | null = await productRepositoryStore.productRepository.getProductById(storeItem.productId);
        if (product === null) {
          throw new Error('カート内の商品情報が得られませんでした。');
        }
        updatedCartItems.push({
          product: {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
          },
          quantity: storeItem.quantity,
          deletedAt: null
        });
      }
    }
    cartItems.value = updatedCartItems;
  }

  onMounted(async () => {
    try {
      await rateStore.initializeRate(props.rateRepository);
      if (rateStore.jpyRate === null) {
        throw new Error('JPYレートが取得できませんでした。');
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  });

  watch(() => [...cartStore.cartItems],updateCartItems,{immediate: true, deep: true});
  watch(() => productRepositoryStore.productRepository, updateCartItems);
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
          <p>Price: {{ convertToYen(item.product.price, rateStore.formattedRate).toLocaleString() }}円</p>
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
