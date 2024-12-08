<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import FeatureModel from '@/components/feature_model/FeatureModel.vue'
import ComputationGraph from '@/components/runtime/ComputationGraph.vue'
</script>

<template>
  <div class="runtime-view">
    <div class="left-side">
      <FeatureModel />
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
