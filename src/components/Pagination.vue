<script setup lang="ts">
import { useLoadingStore } from "../stores/useLoadingStore";

const emit = defineEmits<{
  (e: "page-change", id: number): void;
}>();

defineProps<{
  currentPage: number;
  pagesCount: number;
  error: Error | null;
}>();

const loadingStore = useLoadingStore();
</script>

<template>
  <p class="current-page">Current page: {{ currentPage }}</p>
  <p class="pages-count">Pages count: {{ pagesCount }}</p>
  <button
    :disabled="loadingStore.loading || error !== null || currentPage === 1"
    class="pagination-button"
    @click="emit('page-change', -1)"
  >
    Prev page
  </button>
  <button
    :disabled="
      loadingStore.loading || error !== null || currentPage === pagesCount
    "
    class="pagination-button"
    @click="emit('page-change', 1)"
  >
    Next page
  </button>
</template>

<style scoped>
.pagination-button {
  padding: 0.5rem;
  border-radius: 10px;
  margin-right: 1rem;
}

.pagination-button:hover {
  cursor: pointer;
}

.current-page,
.pages-count {
  margin-bottom: 0.5rem;
}
</style>
