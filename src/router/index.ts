import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productList',
      component: ProductList,
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: () => import('../views/ProductDetailView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/purchase-history',
      name: 'purchaseHistory',
      component: () => import('../views/PurchaseHistoryView.vue'),
    }
  ],
})

export default router
