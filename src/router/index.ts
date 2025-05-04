import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/list', component: ListView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})