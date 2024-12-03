<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import ComputationGraph from '@/components/runtime/ComputationGraph.vue'

enum FeatureIcon {
  ICON_TRUE = '\u2713',
  ICON_FALSE = '\u2716', // '\u00d7',
  ICON_MAYBE = '',
}

enum FeatureType {
  ROSLAUNCH,
  ARGUMENT,
  VALUE,
}
</script>

<template>
  <div class="runtime-view">
    <div class="left-side">
      <h2>Launch Files</h2>
      <div class="panel"></div>
    </div>

    <div class="right-side">
      <ComputationGraph />
    </div>
  </div>
</template>

<style>
.runtime-view {
  height: 100%;
  flex: 1;
  display: flex;
  gap: 1rem;
}

.runtime-view > .left-side {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.runtime-view > .left-side > .panel {
  flex: 1;
  background-color: aqua;
}

.runtime-view > .right-side {
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
}
</style>
