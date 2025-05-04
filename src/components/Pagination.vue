<script setup lang="ts">
import { useLoadingStore } from "../stores/useLoadingStore";

const emit = defineEmits<{
  (e: "page-change", id: number): void;
}>();

const props = defineProps<{
  currentPage: number;
  pagesCount: number;
  error: Error | null;
}>();

const loadingStore = useLoadingStore();

function handleClick(page: number) {
  if (loadingStore.loading) return;
  if (props.error !== null) return;

  if (page < 1 || page > props.pagesCount) return;

  emit("page-change", page);
}
</script>

<template>
  <p class="current-page">Current page: {{ currentPage }}</p>
  <p class="pages-count">Pages count: {{ pagesCount }}</p>
  <button
    :disabled="loadingStore.loading || error !== null || currentPage === 1"
    class="pagination-button"
    @click="handleClick(currentPage - 1)"
  >
    Prev page
  </button>
  <button
    :disabled="
      loadingStore.loading || error !== null || currentPage === pagesCount
    "
    class="pagination-button"
    @click="handleClick(currentPage + 1)"
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
