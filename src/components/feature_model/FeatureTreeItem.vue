<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { computed, ref } from 'vue'
import FeatureTree from '../feature_model/FeatureTree.vue'

// Constants -------------------------------------------------------------------

enum FeatureIcon {
  TRUE = '\u2713',
  FALSE = '\u2716', // '\u00d7',
  MAYBE = '?',
}

// Component State -------------------------------------------------------------

const emit = defineEmits<{
  (e: 'select'): void
}>()

const props = defineProps<{
  name: string
  hasChildren: boolean
  selected: boolean | null
}>()

const collapsed = ref<boolean>(false)

const selectionStatusLabel = computed<string>(() => {
  return props.selected
    ? FeatureIcon.TRUE
    : props.selected === false
      ? FeatureIcon.FALSE
      : FeatureIcon.MAYBE
})

// Component Methods -----------------------------------------------------------

function toggle() {
  if (props.hasChildren) {
    collapsed.value = !collapsed.value
  }
}
</script>

<!----------------------------------------------------------------------------->

<template>
  <li class="item">
    <div class="emph" :class="{ bold: hasChildren }">
      <code v-if="hasChildren" @click.stop="toggle">
        <!-- @dblclick="changeType" -->
        [{{ collapsed ? '+' : '-' }}]
      </code>
      <span @click.stop="emit('select')">{{ name }}</span>
      &nbsp;
      <span>{{ selectionStatusLabel }}</span>
    </div>

    <!-- v-if="$slots.default" -->
    <FeatureTree v-if="hasChildren" :collapsed="collapsed">
      <slot></slot>
    </FeatureTree>
  </li>
</template>

<!----------------------------------------------------------------------------->

<style></style>
