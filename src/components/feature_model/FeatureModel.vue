<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useFeatureModelStore } from '@/stores/featureModel'

import FeatureTree from './FeatureTree.vue'
import LaunchFeature from './LaunchFeature.vue'
import type { FeatureId } from '@/types/runtime'

// Component State -------------------------------------------------------------

const fmStore = useFeatureModelStore()

const { featureModel, name, launch } = storeToRefs(fmStore)

const syncing = ref<boolean>(true)

// Component Methods -----------------------------------------------------------

function onComputeCG(): void {}

function updateSelectionStatus(id: FeatureId, status: boolean | null): void {
  launch.value[id].selected = status
}
</script>

<!----------------------------------------------------------------------------->

<template>
  <div class="feature-model" ref="featureModelContainer">
    <div class="header">
      <h2>{{ name }}</h2>
      <div class="toolbar" role="toolbar">
        <button :disabled="syncing" @click="onComputeCG">Compute</button>
      </div>
    </div>

    <div class="panel">
      <FeatureTree :collapsed="false">
        <LaunchFeature
          v-for="feature in featureModel.launch"
          :key="feature.id"
          :model="feature"
          v-bind="launch[feature.id]"
          @selection="updateSelectionStatus"
        />
      </FeatureTree>
    </div>
  </div>
</template>

<!----------------------------------------------------------------------------->

<style>
.feature-model {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-model > .header {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.feature-model > .header > h2 {
  flex: 1;
  overflow-x: hidden;
}

.feature-model > .header > .toolbar {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.feature-model > .header > .toolbar > button {
  flex: 0 0 auto;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: 0.25s;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.feature-model > .header > .toolbar > button:disabled {
  background-color: transparent;
  cursor: not-allowed;
  border: 1px solid var(--color-border);
  color: var(--color-border);
}

.feature-model > .header > .toolbar > button:hover:not(:disabled) {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-green);
  color: var(--color-heading);
}

.feature-model > .panel {
  flex: 1;
  position: relative;
  display: flex;
  overflow-y: auto;
}
</style>
