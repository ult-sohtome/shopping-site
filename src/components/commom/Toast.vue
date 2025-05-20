<script setup lang="ts">
  import { useToastStore } from '@/stores/UseToastStore';

  const toastStore = useToastStore();
</script>

<template>
  <div v-if="toastStore.showToast"
   class="toast"
   :style="{ top: toastStore.toastY + 10 + 'px', left: toastStore.toastX + 'px' }"
  >
    {{ toastStore.toastMessage }}
  </div>
</template>

<style scoped>
  .toast {
    position: fixed;
    background-color: #4caf50;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-size: 0.9rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    white-space: nowrap;
    pointer-events: none;
  }
</style>