<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1>HAROSviz</h1>

    <nav class="app-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/issues">Issues</RouterLink>
      <RouterLink to="/source">Source</RouterLink>
      <RouterLink to="/runtime">Runtime</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
.app-header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.app-header > h1 {
  font-weight: 500;
  font-size: 2rem;
  color: var(--color-green);
  flex: 1;
}

.app-nav {
  flex: 3;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-size: 1.25rem;
}

.app-nav a.router-link-exact-active {
  color: var(--color-heading);
  background-color: var(--color-background-mute);
  border-color: var(--color-green);
}

/*.app-nav a.router-link-exact-active:hover {
  background-color: transparent;
}*/

.app-nav a {
  display: inline-block;
  padding: 0 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}

/*.app-nav a:first-of-type {
  border: 0;
}*/

@media (min-width: 1024px) {
  .app-header > h1 {
    font-size: 2.6rem;
  }

  .app-nav {
    gap: 2rem;
  }

  .app-nav a {
    padding: 0 1rem;
  }
}
</style>
