<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import ProjectSelector from '@/components/home/ProjectSelector.vue'
</script>

<template>
  <div class="home-view">
    <div class="left-side">
      <ProjectSelector />
      <div class="panel"></div>
    </div>

    <div class="right-side">
      <div class="panel"></div>
    </div>
  </div>
</template>

<style>
.home-view {
  height: 100%;
  flex: 1;
  display: flex;
  gap: 1rem;
}

.home-view > .left-side {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.home-view > .left-side > .panel {
  flex: 1;
}

.home-view > .right-side {
  height: 100%;
  flex: 2;
  display: flex;
  padding-top: 0.25rem;
}

.home-view > .right-side > .panel {
  flex: 1;
}
</style>
