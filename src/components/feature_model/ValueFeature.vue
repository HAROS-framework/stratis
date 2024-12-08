<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import FeatureTreeItem from './FeatureTreeItem.vue'

// Component State -------------------------------------------------------------

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const props = defineProps<{
  value: string
  selected: boolean
}>()
</script>

<!----------------------------------------------------------------------------->

<template>
  <FeatureTreeItem
    :name="value"
    :has-children="false"
    :selected="selected"
    @select="emit('select', value)"
  />
</template>

<!----------------------------------------------------------------------------->

<style></style>
