<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { ref } from 'vue'

import { type LaunchFeatureDescription, type FeatureId } from '@/types/runtime'

import FeatureTreeItem from './FeatureTreeItem.vue'
import ArgFeature from './ArgFeature.vue'

// Component Interface ---------------------------------------------------------

const emit = defineEmits<{
  (e: 'selection', id: FeatureId, status: boolean | null): void
}>()

// Component State -------------------------------------------------------------

const props = defineProps<{
  model: LaunchFeatureDescription
}>()

const selected = ref<boolean | null>(false)

// Event Handling --------------------------------------------------------------

function onSelect(): void {
  if (selected.value === true) {
    selected.value = false
  } else if (selected.value === false) {
    selected.value = null
  } else {
    selected.value = true
  }
  emit('selection', props.model.id, selected.value)
}

function onArgSelected(id: string, value: string): void {
  if (selected.value === false) {
    selected.value = true
    emit('selection', props.model.id, true)
  }
}
</script>

<!----------------------------------------------------------------------------->

<template>
  <FeatureTreeItem
    :name="model.name"
    :has-children="model.args.length > 0"
    :selected="selected"
    @select="onSelect"
  >
    <ArgFeature
      v-for="arg in model.args"
      :key="arg.id"
      :model="arg"
      :disabled="selected === false"
      @selection="onArgSelected"
    />
  </FeatureTreeItem>
</template>

<!----------------------------------------------------------------------------->

<style></style>
