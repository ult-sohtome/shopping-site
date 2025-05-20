<script setup lang="ts">
  import { watch } from 'vue';

  const props = defineProps<{
    showToast: boolean,
    toastMessage: string,
    toastX: number,
    toastY: number
  }>();
  const emit = defineEmits(['update:showToast']);
  
  watch(() => props.showToast, (showToast) => {
    if (showToast) {
      setTimeout(() => {
        emit('update:showToast', false);
      }, 1000);
    }
  });
</script>

<template>
  <div v-if="showToast"
   class="toast"
   :style="{ top: toastY + 10 + 'px', left: toastX + 'px' }"
  >
    {{ toastMessage }}
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