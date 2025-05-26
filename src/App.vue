<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import type { PurchaseHistoryRepositoryInterface } from './interfaces/PurchaseHistoryRepositoryInterface'
import { LocalStoragePurchaseHistoryRepository } from '@/repositories/LocalStoragePurchaseHistoryRepository'
import { usePurchaseHistoryStore } from './stores/UsePurchaseHistoryStore'
import { useProductRepositoryStore } from './stores/UseProductRepositoryStore'
import { runMigrations } from './migrations/runMigrations'

const props = withDefaults(defineProps<{
  purchaseHistoryRepository?: PurchaseHistoryRepositoryInterface
}>(), {
  purchaseHistoryRepository: () => new LocalStoragePurchaseHistoryRepository(),
});

const purchaseHistoryStore = usePurchaseHistoryStore();
const repositoryStore = useProductRepositoryStore();

onMounted(() => {
  runMigrations(props.purchaseHistoryRepository);
  purchaseHistoryStore.initializePurchaseHistory(props.purchaseHistoryRepository);
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">商品一覧</RouterLink>
        <RouterLink to="/cart">カート一覧</RouterLink>
        <RouterLink to="/purchase-history">購入履歴</RouterLink>
      </nav>
    </div>
    <button @click="repositoryStore.toggleProductRepository">
      {{ repositoryStore.isUseStub ? '本番商品APIに切り替え' : '商品スタブに切り替え' }}
    </button>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  justify-content: center;
  place-items: center;
}

nav {
  display: flex;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
