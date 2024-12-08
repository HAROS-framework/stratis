<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { computed } from 'vue'
import FeatureTreeItem from './FeatureTreeItem.vue'

// Component State -------------------------------------------------------------

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const props = defineProps<{
  value: string
  selected: boolean
}>()

const displayName = computed<string>(() => `$(${props.value || '?'})`)

// Event Handlers --------------------------------------------------------------

function onSelect(): void {
  if (!props.selected && props.value) {
    emit('select', props.value)
  } else {
    const value = window.prompt('Enter a value:', '')
    if (value != null) {
      emit('select', value)
    }
  }
}
</script>

<!----------------------------------------------------------------------------->

<template>
  <FeatureTreeItem
    :name="displayName"
    :has-children="false"
    :selected="selected"
    @select="onSelect"
  />
</template>

<!----------------------------------------------------------------------------->

<style></style>
