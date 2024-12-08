<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { computed, ref } from 'vue'
import type { ArgFeatureDescription } from '@/types/runtime'
import FeatureTreeItem from './FeatureTreeItem.vue'
import ValueFeature from './ValueFeature.vue'
import UnknownValueFeature from './UnknownValueFeature.vue'

// Component State -------------------------------------------------------------

const emit = defineEmits<{
  (e: 'selection', id: string, value: string): void
}>()

const props = defineProps<{
  model: ArgFeatureDescription
  disabled: boolean
}>()

const currentValue = ref<string>(props.model.defaultValue)
const userValue = ref<string>('')

const selected = computed<boolean | null>(() =>
  props.disabled ? false : currentValue.value ? true : props.model.defaultValue ? null : false,
)

// Event Handlers --------------------------------------------------------------

function onValueSelected(value: string): void {
  currentValue.value = value
  emit('selection', props.model.id, value)
}

function onUnknownValueSelected(value: string): void {
  if (!props.model.knownValues.includes(value)) {
    userValue.value = value
  }
  currentValue.value = value
  emit('selection', props.model.id, value)
}
</script>

<!----------------------------------------------------------------------------->

<template>
  <FeatureTreeItem
    :name="model.name"
    :has-children="true"
    :selected="selected"
    @select="emit('selection', model.id, currentValue)"
  >
    <ValueFeature
      v-for="knownValue in model.knownValues"
      :value="knownValue"
      :selected="!disabled && knownValue === currentValue"
      @select="onValueSelected"
    />

    <UnknownValueFeature
      :value="userValue"
      :selected="!disabled && currentValue === userValue"
      @select="onUnknownValueSelected"
    />
  </FeatureTreeItem>
</template>

<!----------------------------------------------------------------------------->

<style></style>
