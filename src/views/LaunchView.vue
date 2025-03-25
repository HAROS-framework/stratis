<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { LaunchFile, LaunchId } from '@/types/launch'
import { useLaunchFileStore } from '@/stores/launch'
import DependencyGraph, {
  type GraphLinkDatum,
  type GraphNodeDatum,
  type NodeLinkGraph,
} from '@/components/launch/DependencyGraph.vue'
import LaunchActionList from '@/components/launch/LaunchActionList.vue'

// Constants -------------------------------------------------------------------

const route = useRoute()
const launchStore = useLaunchFileStore()

// Component State -------------------------------------------------------------

const loading = ref<boolean>(false)
const launchFile = ref<LaunchFile | null>(null)
const error = ref<string | null>(null)

// Event Handlers --------------------------------------------------------------

// https://router.vuejs.org/guide/advanced/data-fetching.html

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id: LaunchId | LaunchId[]): Promise<void> {
  // need this just to stop TypeScript error
  if (typeof id !== 'string') {
    id = id[0]
  }
  error.value = launchFile.value = null
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    launchFile.value = await launchStore.getLaunchFile(id)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
    error.value = 'unable to fetch data'
  } finally {
    loading.value = false
  }
}

function getDependencyGraph(): NodeLinkGraph {
  const nodes: GraphNodeDatum[] = []
  const links: GraphLinkDatum[] = []
  if (launchFile.value != null) {
    for (const action of launchFile.value.actions) {
      nodes.push({ id: action.id, group: action.type, condition: '' })
      for (const target of action.dependencies) {
        links.push({ source: action.id, target, value: 2 })
      }
    }
  }
  return { nodes, links }
}
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="launchFile == null">No data available.</div>

  <div v-else class="launch-view">
    <div class="left-side">
      <h3>LAUNCH EXPLORER</h3>
      <h4>
        <img class="icon" src="/src/assets/icon-python.png" />
        {{ launchFile.name }}
      </h4>

      <LaunchActionList v-if="launchFile.actions.length > 0" :actions="launchFile.actions" />
      <p v-else>There are no launch actions.</p>
    </div>

    <div class="right-side">
      <h3>DEPENDENCY GRAPH</h3>
      <DependencyGraph :data="getDependencyGraph()" />
    </div>
  </div>
</template>

<style>
.launch-view {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.launch-view > .left-side {
  height: 100%;
  flex: 3;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.launch-view > .left-side img.icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.launch-view > .right-side {
  height: 100%;
  flex: 2 0 0;
  display: flex;
  flex-direction: column;
}
</style>
