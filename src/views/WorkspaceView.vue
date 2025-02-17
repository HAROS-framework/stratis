<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import PackageList from '@/components/workspace/PackageList.vue'
</script>

<template>
  <div class="workspace-view">
    <div class="left-side">
      <h1>Workspace</h1>
      <PackageList />
    </div>

    <div class="right-side">
      <h1>Placeholder</h1>
    </div>
  </div>
</template>

<style>
.workspace-view {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.workspace-view > .left-side {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.workspace-view > .right-side {
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
