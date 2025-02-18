<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2025 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { computed } from 'vue'

import type { PackageDetails } from '@/types/workspace'
import SelectableList from '../SelectableList.vue'

// Constants -------------------------------------------------------------------

const props = defineProps<{ packageData: PackageDetails[] }>()

const emit = defineEmits<{
  (e: 'select', i: number): void
}>()

// Component State -------------------------------------------------------------

const packageNames = computed<string[]>(() => {
  const names: string[] = []
  for (const pkg of props.packageData) {
    names.push(pkg.name)
  }
  return names
})

// Component Methods -----------------------------------------------------------

function onSelectPackage(i: number): void {
  emit('select', i)
}
</script>

<template>
  <SelectableList :items="packageNames" @select="onSelectPackage" />
</template>

<style></style>
