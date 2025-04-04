<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import {
  LaunchActionType,
  type LaunchAction,
  type LaunchActionId,
  type LaunchIncludeAction,
} from '@/types/launch'

// Constants -------------------------------------------------------------------

defineProps<{
  actions: LaunchAction[]
  selectedAction?: LaunchActionId
  currentDependencies: Set<LaunchActionId>
}>()

const emit = defineEmits<{
  (e: 'select', action: LaunchAction): void
}>()

// Event Handlers --------------------------------------------------------------

function onSelectAction(action: LaunchAction): void {
  emit('select', action)
}
</script>

<template>
  <ul class="launch-action-list">
    <li
      v-for="action in actions"
      :key="action.id"
      :class="{
        selected: selectedAction && action.id === selectedAction,
        dependency: currentDependencies.has(action.id),
      }"
      @click.stop="onSelectAction(action)"
    >
      <div class="header">
        <span class="tag" :class="`type-${action.type}`">{{ action.type.toUpperCase() }}</span>
        {{ action.name }}
        <span v-if="currentDependencies.has(action.id)">(dep)</span>
      </div>

      <div v-if="selectedAction && action.id === selectedAction" class="panel details">
        <i v-if="action.type === LaunchActionType.ARG">Launch file argument</i>
        <i v-else-if="action.type === LaunchActionType.NODE">ROS node</i>
        <i v-else-if="action.type === LaunchActionType.INCLUDE">Launch file inclusion</i>
        <!--<p v-if="action.dependencies.length > 0">
          Depends on:
          <template v-for="(dep, i) in action.dependencies" :key="dep">
            <template v-if="i > 0">, </template>
            <code>{{ dep }}</code>
          </template>
        </p>-->
      </div>
      <LaunchActionList
        v-if="
          action.type === LaunchActionType.INCLUDE &&
          (action as LaunchIncludeAction).actions.length > 0
        "
        :actions="(action as LaunchIncludeAction).actions"
        :selectedAction="selectedAction"
        :currentDependencies="currentDependencies"
        @select="onSelectAction"
      />
    </li>
  </ul>
</template>

<style>
.launch-action-list {
  flex: 1;
  /*padding: 0 0 0 1.5rem;
  list-style-type: '» ';*/
  padding: 0 0 0 0.5rem;
  border-left: 1px solid var(--color-border);
  font-size: 0.75rem;
  font-family: monospace;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0 0 1rem;
  color: var(--color-text);
}

.launch-action-list > li.selected,
.launch-action-list > li.selected:hover {
  background-color: var(--color-green-hover);
  color: var(--color-heading);
}

.launch-action-list > li.dependency {
  /*animation: text-pulse 2s infinite;*/
  color: var(--color-heading);
}

/*@keyframes text-pulse {
  0% {
    color: var(--color-text);
  }
  50% {
    color: var(--color-heading);
  }
  100% {
    color: var(--color-text);
  }
}*/

.launch-action-list > li > .header {
  cursor: pointer;
}

.launch-action-list > li > .header:hover {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
}

.launch-action-list > li > .header > .tag {
  border-radius: 0.25em;
  border: 1px solid var(--color-text);
  /* font-variant-caps: all-petite-caps;
  font-size: 1rem;*/
  padding: 0 0.25em;
}

.launch-action-list > li > .header > .tag.type-arg {
  border: 1px solid var(--color-green);
  color: var(--color-green);
}

.launch-action-list > li > .header > .tag.type-node {
  border: 1px solid var(--color-blue);
  color: var(--color-blue);
}

.launch-action-list > li > .header > .tag.type-include {
  border: 1px solid var(--color-yellow);
  color: var(--color-yellow);
}
</style>
