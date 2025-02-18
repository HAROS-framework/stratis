<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import PackageList from '@/components/workspace/PackageList.vue'
import type { PackageDetails, PackageSummary } from '@/types/workspace'
import { ref } from 'vue'

// Constants -------------------------------------------------------------------

const packageData: PackageSummary[] = [
  {
    id: '001',
    name: 'turtlebot_navigation',
  },
  {
    id: '002',
    name: 'turtlebot_safety_controller',
  },
  {
    id: '003',
    name: 'turtlebot_multiplexer',
  },
  {
    id: '004',
    name: 'turtlebot_joystick_controller',
  },
  {
    id: '005',
    name: 'turtlebot_hardware_interface',
  },
]

// Component State -------------------------------------------------------------

const packageDetails = ref<PackageDetails | null>(null)

// Event Handlers --------------------------------------------------------------

function onPackageSelected(i: number): void {
  const pkg = packageData[i]
  packageDetails.value = { id: pkg.id }
}
</script>

<template>
  <div class="workspace-view">
    <div class="left-side">
      <h1>Workspace</h1>
      <PackageList :package-data="packageData" @select="onPackageSelected" />
    </div>

    <div class="right-side">
      <h1>Placeholder</h1>
      <p v-if="packageDetails != null">
        You have selected the package with <code>id: {{ packageDetails.id }}</code>
      </p>
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
