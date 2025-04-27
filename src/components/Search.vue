<script setup lang="ts">
import { ref } from "vue";
import debounce from "debounce";

const emit = defineEmits<{
  (e: "query-change", q: string): void;
}>();

const searching = ref<boolean>(false);

const debouncedEmit = debounce((input: string) => {
  emit("query-change", input);
  searching.value = false;
}, 2000);

function handleInputChange(input: string) {
  searching.value = true;
  debouncedEmit(input);
}
</script>

<template>
  <div class="search">
    <label class="search-title" for="search">Search posts</label>
    <input
      @input="(e) => handleInputChange(e?.target?.value)"
      class="search-input"
      name="search"
      id="search"
      type="text"
    />
    <p v-if="searching">Searching...</p>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  max-width: 300px;
  flex-direction: column;
  margin-bottom: 1rem;
}

.search-title {
  margin-bottom: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border-radius: 10px;
}
</style>
