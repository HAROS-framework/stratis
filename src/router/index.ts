// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/issues',
      name: 'issues',
      // route level code-splitting
      // this generates a separate chunk (Issues.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IssuesView.vue'),
    },
    {
      path: '/source',
      name: 'source',
      // route level code-splitting
      // this generates a separate chunk (Source.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SourceView.vue'),
    },
    {
      path: '/runtime',
      name: 'runtime',
      // route level code-splitting
      // this generates a separate chunk (Runtime.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RuntimeView.vue'),
    },
  ],
})

export default router
