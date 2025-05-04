<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <br />
    <RouterLink :to="{ path: '/list', query: { _page: 1, q: '' } }"
      >Go to List</RouterLink
    >
  </nav>
</template>
