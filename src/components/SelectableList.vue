<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { ref } from 'vue'

// Constants -------------------------------------------------------------------

defineProps<{ items: string[] }>()

const emit = defineEmits<{
  (e: 'select', i: number): void
}>()

// Component State -------------------------------------------------------------

const selectedItem = ref<number>(-1)

// Component Methods -----------------------------------------------------------

function onSelectItem(i: number): void {
  selectedItem.value = i
  emit('select', i)
}
</script>

<template>
  <ul class="selectable-list">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="{ selected: selectedItem == i }"
      @click="onSelectItem(i)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style>
.selectable-list {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  background-color: var(--color-background-mute);
}

.selectable-list > li {
  cursor: pointer;
  padding: 0 0.5rem;
}

.selectable-list > li:hover {
  background-color: var(--color-green-hover);
  color: var(--color-green);
}

.selectable-list > li.selected {
  background-color: var(--color-border);
  color: var(--color-heading);
}

.selectable-list > li.selected:hover {
  background-color: var(--color-green-hover);
  color: var(--color-heading);
}
</style>
