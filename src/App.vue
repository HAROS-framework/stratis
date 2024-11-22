<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="app-header">
    <HelloWorld msg="HAROSviz" />

    <nav class="app-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">Issues</RouterLink>
      <RouterLink to="/about">Source</RouterLink>
      <RouterLink to="/about">Runtime</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
.app-header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

.app-nav {
  font-size: 1.25rem;
}

.app-nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

.app-nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.app-nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.app-nav a:first-of-type {
  border: 0;
}
</style>
