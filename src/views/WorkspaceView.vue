<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { onMounted, ref } from 'vue'

import PackageList from '@/components/workspace/PackageList.vue'
import { ComponentType, type PackageDetails, type PackageId } from '@/types/workspace'

// Constants -------------------------------------------------------------------

const dummyPackageData: Record<PackageId, PackageDetails> = {
  '002': {
    id: '002',
    name: 'turtlebot3_bringup',
    launch: [
      { id: '001', name: 'robot.launch.py' },
      { id: '002', name: 'rviz2.launch.py' },
      { id: '003', name: 'turtlebot3_state_publisher.launch.py' },
    ],
    components: [],
  },
  '003': {
    id: '003',
    name: 'turtlebot3_navigation2',
    launch: [{ id: '004', name: 'navigation2.launch.py' }],
    components: [],
  },
  '001': {
    id: '001',
    name: 'turtlebot3_node',
    launch: [],
    components: [{ id: '001', type: ComponentType.NODE, name: 'turtlebot3_ros' }],
  },
}

// Component State -------------------------------------------------------------

const packageData = ref<PackageDetails[]>([])

const selectedPackage = ref<PackageDetails | null>(null)

// Event Handlers --------------------------------------------------------------

function onPackageSelected(i: number): void {
  selectedPackage.value = packageData.value[i] || null
}

onMounted(() => {
  packageData.value = Object.values(dummyPackageData).sort(_sortByName)
})

function _sortByName(a: { name: string }, b: { name: string }): number {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
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
      <div v-if="selectedPackage != null" class="panel">
        <p>
          You have selected the package with <code>id: {{ selectedPackage.id }}</code
          >.
        </p>

        <h2>Launch Files</h2>
        <ul v-if="selectedPackage.launch.length > 0">
          <li v-for="item in selectedPackage.launch" :key="item.id">
            <RouterLink :to="`/launch/${item.id}`">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
        <p v-else>There are no launch files.</p>

        <h2>Components</h2>
        <ul v-if="selectedPackage.components.length > 0">
          <li v-for="item in selectedPackage.components" :key="item.id">
            {{ item.name }} ({{ item.type === ComponentType.NODE ? 'node' : 'other' }})
          </li>
        </ul>
        <p v-else>There are no declared components.</p>
      </div>
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
