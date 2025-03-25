<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { LaunchAction, LaunchActionId, LaunchFile, LaunchId } from '@/types/launch'
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

const selectedAction = ref<LaunchActionId>('')
const currentDependencies = computed<Set<LaunchActionId>>(getDependencies)
const dependencyGraph = ref<NodeLinkGraph>(getDependencyGraph())

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
  selectedAction.value = ''
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    launchFile.value = await launchStore.getLaunchFile(id)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
    error.value = 'unable to fetch data'
  } finally {
    loading.value = false
    dependencyGraph.value = getDependencyGraph()
  }
}

function onSelectAction(id: LaunchActionId): void {
  if (selectedAction.value === id) {
    selectedAction.value = ''
  } else {
    selectedAction.value = id
  }
  dependencyGraph.value = getDependencyGraph()
}

// Helper Functions ------------------------------------------------------------

function getDependencyGraph(): NodeLinkGraph {
  const nodes: GraphNodeDatum[] = []
  const links: GraphLinkDatum[] = []
  if (launchFile.value != null) {
    if (selectedAction.value !== '') {
      const actions: Record<LaunchActionId, LaunchAction> = {}
      for (const action of launchFile.value.actions) {
        actions[action.id] = action
      }
      let action = actions[selectedAction.value]
      nodes.push({ id: action.id, name: action.name, group: action.type, condition: '' })
      for (const target of action.dependencies) {
        links.push({ source: action.id, target, value: 2 })
      }
      // transitive dependencies
      const deps: LaunchActionId[] = action.dependencies.slice()
      while (deps.length > 0) {
        action = actions[deps.pop()!]
        nodes.push({ id: action.id, name: action.name, group: action.type, condition: '' })
        for (const target of action.dependencies) {
          links.push({ source: action.id, target, value: 2 })
          deps.push(target)
        }
      }
    } else {
      for (const action of launchFile.value.actions) {
        nodes.push({ id: action.id, name: action.name, group: action.type, condition: '' })
        for (const target of action.dependencies) {
          links.push({ source: action.id, target, value: 2 })
        }
      }
    }
  }
  return { nodes, links }
}

function getDependencies(): Set<LaunchActionId> {
  const id = selectedAction.value
  if (id !== '' && launchFile.value != null) {
    for (const action of launchFile.value.actions) {
      if (action.id === id) {
        return new Set(action.dependencies)
      }
    }
  }
  return new Set([])
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

      <LaunchActionList
        v-if="launchFile.actions.length > 0"
        :actions="launchFile.actions"
        :selected-action="selectedAction"
        :current-dependencies="currentDependencies"
        @select="onSelectAction"
      />
      <p v-else>There are no launch actions.</p>
    </div>

    <div class="right-side">
      <h3>DEPENDENCY GRAPH</h3>
      <DependencyGraph :model="dependencyGraph" />
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
