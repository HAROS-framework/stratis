<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import ProjectSelector from '@/components/home/ProjectSelector.vue'
import ProjectStats from '@/components/home/ProjectStats.vue'
import StatsChart from '@/components/home/StatsChart.vue'

const alphabet = [
  { key: 'A', value: 0.08167 },
  { key: 'B', value: 0.01492 },
  { key: 'C', value: 0.02782 },
  { key: 'D', value: 0.04253 },
  { key: 'E', value: 0.12702 },
  { key: 'F', value: 0.02268 },
]
</script>

<template>
  <div class="home-view">
    <div class="left-side">
      <ProjectSelector />
      <ProjectStats />
    </div>

    <div class="right-side">
      <StatsChart :data="alphabet" />
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
  gap: 1rem;
}

.home-view > .left-side > .panel {
  flex: 1;
}

.home-view > .right-side {
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home-view > .right-side > .panel {
  flex: 1;
}
</style>
