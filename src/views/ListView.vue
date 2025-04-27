<script setup lang="ts">
import { onMounted, watch } from "vue";
import Pagination from "../components/Pagination.vue";
import { usePostsData } from "../composables/usePostsData";
import Search from "../components/Search.vue";
import { useLoadingStore } from "../stores/useLoadingStore";

const { posts, error, fetchPosts, currentPage, pagesCount, query } =
  usePostsData();

const loadingStore = useLoadingStore();

async function updateView() {
  loadingStore.loading = true;
  await fetchPosts();
  loadingStore.loading = false;
}

onMounted(updateView);

watch([query, currentPage], updateView);

function handlePageChange(page: number) {
  currentPage.value += page;
}

function handleSearch(q: string) {
  currentPage.value = 1;
  query.value = q;
}
</script>

<template>
  <div>
    <h3 class="title">Posts list</h3>
    <Search @query-change="handleSearch" />
    <ul class="posts-list" v-if="!loadingStore.loading">
      <li v-for="post in posts" :key="post.id">
        <div class="post-card">
          <p>Title: {{ post.title }}</p>
          <p class="nomargin">Views: {{ post.views }}</p>
        </div>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
  <Pagination
    :current-page="currentPage"
    :pages-count="pagesCount"
    :error="error"
    @page-change="handlePageChange"
  />
</template>

<style>
.title {
  margin-bottom: 1rem;
}

.posts-list {
  list-style-type: none;
}

.post-card {
  padding: 1rem;
  max-width: 300px;
  background-color: bisque;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.post-card p {
  margin-bottom: 0.5rem;
}

.nomargin {
  margin-bottom: 0 !important;
}
</style>
