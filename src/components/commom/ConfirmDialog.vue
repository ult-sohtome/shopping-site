<script setup lang="ts">
const props = defineProps<{
  isDialogVisible: boolean,
  dialogMessage: string
}>();
const emit = defineEmits<{
  (event: 'confirm'): void;
  (event: 'cancel'): void;
}>();

const handleConfirm = () => emit('confirm');
const handleCancel = () => emit('cancel');
</script>

<template>
  <div v-if="isDialogVisible" class="dialog">
    <div class="dialog-content">
      <p>{{ dialogMessage }}</p>
      <div class="actions">
        <button class="confirm-button" @click="handleConfirm">実行</button>
        <button class="cancel-button" @click="handleCancel">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.confirm-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.confirm-button:hover {
  background-color: #347937;
}
.cancel-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #b1b1b1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-button:hover {
  background-color: #8c8c8c;
}
</style>