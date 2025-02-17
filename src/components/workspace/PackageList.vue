<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import type { PackageSummary } from '@/types/workspace'
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

const selectedIssue = ref<number>(0)

// Component Methods -----------------------------------------------------------

function onSelectIssue(i: number): void {
  selectedIssue.value = i
}
</script>

<template>
  <ul class="package-list">
    <li
      v-for="(pkg, i) in packageData"
      :key="i"
      :class="{ active: selectedIssue == i }"
      @click="onSelectIssue(i)"
    >
      {{ pkg.name }}
    </li>
  </ul>
</template>

<style>
.package-list {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  background-color: var(--color-background-mute);
}

.package-list > li {
  cursor: pointer;
  padding: 0 0.5rem;
}

.package-list > li:hover {
  background-color: var(--color-green-hover);
  color: var(--color-green);
}

.package-list > li.active {
  background-color: var(--color-border);
  color: var(--color-heading);
}

.package-list > li.active:hover {
  background-color: var(--color-green-hover);
  color: var(--color-heading);
}
</style>
