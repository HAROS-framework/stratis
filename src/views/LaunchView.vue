<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Arc diagram might be a better view for this type of information
// https://observablehq.com/@d3/arc-diagram

// Imports ---------------------------------------------------------------------

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  LaunchActionType,
  type LaunchAction,
  type LaunchActionId,
  type LaunchFile,
  type LaunchId,
  type LaunchIncludeAction,
} from '@/types/launch'
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

const actionMap = ref<Record<LaunchActionId, LaunchAction>>({})
const selectedAction = ref<LaunchAction | null>(null)
const currentDependencies = computed<Set<LaunchActionId>>(getDependencies)

const dependencyGraph = ref<NodeLinkGraph>(getDependencyGraph())
const filteredGraph = computed<NodeLinkGraph>(filterDependencyGraph)

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
  selectedAction.value = null
  loading.value = true

  try {
    // replace `getPost` with your data fetching util / API wrapper
    launchFile.value = await launchStore.getLaunchFile(id)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
    error.value = 'unable to fetch data'
  } finally {
    loading.value = false
    actionMap.value = getLaunchActionMap()
    dependencyGraph.value = getDependencyGraph()
  }
}

function onSelectAction(action: LaunchAction): void {
  for (const node of Object.values(dependencyGraph.value.nodes)) {
    node.level = 0
  }
  if (selectedAction.value != null && selectedAction.value.id === action.id) {
    selectedAction.value = null
  } else {
    selectedAction.value = action
  }
}

// Helper Functions ------------------------------------------------------------

function getLaunchActionMap(): Record<LaunchActionId, LaunchAction> {
  const map: Record<LaunchActionId, LaunchAction> = {}
  if (launchFile.value != null) {
    const stack: LaunchAction[] = launchFile.value.actions.slice()
    while (stack.length > 0) {
      const action: LaunchAction = stack.pop()!
      map[action.id] = action
      if (action.type === LaunchActionType.INCLUDE) {
        for (const subaction of (action as LaunchIncludeAction).actions) {
          stack.push(subaction)
        }
      }
    }
  }
  return map
}

function filterDependencyGraph(): NodeLinkGraph {
  if (selectedAction.value == null) {
    return dependencyGraph.value
  }

  // transitive dependencies (traverse down)
  const graph = dependencyGraph.value
  const nodes: Record<LaunchActionId, GraphNodeDatum> = {}
  const deps: LaunchActionId[] = [selectedAction.value.id]
  while (deps.length > 0) {
    const action = actionMap.value[deps.pop()!]
    nodes[action.id] = graph.nodes[action.id]
    for (const dep of action.dependencies) {
      if (nodes[dep] == null) {
        deps.push(dep)
      }
    }
  }

  // transitive dependencies (traverse up)
  deps.push(selectedAction.value.id)
  while (deps.length > 0) {
    const action = actionMap.value[deps.pop()!]
    const node = graph.nodes[action.id]
    nodes[action.id] = node
    if (node.parent != null) {
      deps.push(node.parent)
    }
  }

  const links: GraphLinkDatum[] = []
  nodes[selectedAction.value.id].level = 2
  for (const link of dependencyGraph.value.links) {
    if (nodes[link.source as string] != null && nodes[link.target as string] != null) {
      links.push(link)
    }
  }
  return { nodes, links }
}

function getDependencyGraph(): NodeLinkGraph {
  const nodes: Record<LaunchActionId, GraphNodeDatum> = {}
  const links: GraphLinkDatum[] = []
  if (launchFile.value != null) {
    const stack: LaunchAction[] = launchFile.value.actions.slice()
    const parents: LaunchActionId[] = []
    while (stack.length > 0) {
      const action: LaunchAction = stack.pop()!
      const parent = parents.pop()
      nodes[action.id] = {
        id: action.id,
        name: action.name,
        group: action.type,
        dark: action.dependencies.length > 0,
        condition: '',
        parent,
      }
      for (const target of action.dependencies) {
        links.push({ source: action.id, target, isDataLink: true })
      }
      if (action.type === LaunchActionType.INCLUDE) {
        for (const subaction of (action as LaunchIncludeAction).actions) {
          stack.push(subaction)
          parents.push(action.id)
          links.push({ source: subaction.id, target: action.id, isDataLink: false })
        }
      }
    }
  }
  return { nodes, links }
}

function getDependencies(): Set<LaunchActionId> {
  if (launchFile.value == null || selectedAction.value == null) {
    return new Set()
  }
  return new Set(selectedAction.value.dependencies)
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
        :selected-action="selectedAction?.id"
        :current-dependencies="currentDependencies"
        @select="onSelectAction"
      />
      <p v-else>There are no launch actions.</p>
    </div>

    <div class="right-side">
      <h3>DEPENDENCY GRAPH</h3>
      <DependencyGraph :model="filteredGraph" />
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

.launch-view > .left-side > .details {
  flex: 0 0 auto;
  padding: 0 0.5rem;
  max-height: 4rem;
}

.launch-view > .right-side {
  height: 100%;
  flex: 2 0 0;
  display: flex;
  flex-direction: column;
}
</style>
