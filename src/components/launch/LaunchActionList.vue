<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import type { LaunchAction, LaunchActionId } from '@/types/launch'

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
      @click="onSelectAction(action)"
    >
      <span class="tag" :class="`type-${action.type}`">{{ action.type.toUpperCase() }}</span>
      {{ action.name }}
      <span v-if="currentDependencies.has(action.id)">(dep)</span>
    </li>
  </ul>
</template>

<style>
.launch-action-list {
  flex: 1;
  margin-left: 0.5rem;
  padding: 0 1.5rem;
  list-style-type: '» ';
  border-left: 1px solid var(--color-border);
  font-size: 0.75rem;
  font-family: monospace;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
}

.launch-action-list > li {
  cursor: pointer;
}

.launch-action-list > li.selected,
.launch-action-list > li.selected:hover {
  background-color: var(--color-green-hover);
  color: var(--color-heading);
}

.launch-action-list > li.dependency {
  color: var(--color-orange);
}

.launch-action-list > li:hover {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
}

.launch-action-list > li > .tag {
  border-radius: 0.25em;
  border: 1px solid var(--color-text);
  /* font-variant-caps: all-petite-caps;
  font-size: 1rem;*/
  padding: 0 0.25em;
}

.launch-action-list > li > .tag.type-arg {
  border: 1px solid var(--color-yellow);
  color: var(--color-yellow);
}

.launch-action-list > li > .tag.type-node {
  border: 1px solid var(--color-green);
  color: var(--color-green);
}

.launch-action-list > li > .tag.type-include {
  border: 1px solid var(--color-blue);
  color: var(--color-blue);
}
</style>
