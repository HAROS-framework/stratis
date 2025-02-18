<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import PackageList from '@/components/workspace/PackageList.vue'
import {
  ComponentType,
  type PackageDetails,
  type PackageId,
  type PackageSummary,
} from '@/types/workspace'
import { computed, ref } from 'vue'

// Constants -------------------------------------------------------------------

const dummyPackageData: Record<PackageId, PackageDetails> = {
  '001': {
    id: '001',
    name: 'turtlebot3_bringup',
    launch: [
      { id: '001', name: 'robot.launch.py' },
      { id: '002', name: 'rviz2.launch.py' },
      { id: '003', name: 'turtlebot3_state_publisher.launch.py' },
    ],
    components: [],
  },
  '002': {
    id: '002',
    name: 'turtlebot3_navigation2',
    launch: [{ id: '004', name: 'navigation2.launch.py' }],
    components: [],
  },
  '003': {
    id: '003',
    name: 'turtlebot3_node',
    launch: [],
    components: [{ id: '001', type: ComponentType.NODE, name: 'turtlebot3_ros' }],
  },
}

const packageSummaries = computed<PackageSummary[]>(() => {
  return Object.values(dummyPackageData).map(_extractPackageSummary).sort(_sortByName)
})

function _extractPackageSummary(pkg: PackageDetails): PackageSummary {
  return { id: pkg.id, name: pkg.name }
}

function _sortByName(a: { name: string }, b: { name: string }): number {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}

// Component State -------------------------------------------------------------

const packageDetails = ref<PackageDetails | null>(null)

// Event Handlers --------------------------------------------------------------

function onPackageSelected(i: number): void {
  const pkg = packageSummaries.value[i]
  packageDetails.value = dummyPackageData[pkg.id]
}
</script>

<template>
  <div class="workspace-view">
    <div class="left-side">
      <h1>Workspace</h1>
      <PackageList :package-data="packageSummaries" @select="onPackageSelected" />
    </div>

    <div class="right-side">
      <h1>Placeholder</h1>
      <div v-if="packageDetails != null" class="panel">
        <p>
          You have selected the package with <code>id: {{ packageDetails.id }}</code
          >.
        </p>

        <h2>Launch Files</h2>
        <ul v-if="packageDetails.launch.length > 0">
          <li v-for="item in packageDetails.launch" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
        <p v-else>There are no launch files.</p>

        <h2>Components</h2>
        <ul v-if="packageDetails.components.length > 0">
          <li v-for="item in packageDetails.components" :key="item.id">
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
