<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Component State -------------------------------------------------------------

const props = defineProps<{ collapsed: boolean }>()
</script>

<!----------------------------------------------------------------------------->

<template>
  <ul class="tree-view" v-show="!collapsed">
    <slot></slot>
  </ul>
</template>

<!----------------------------------------------------------------------------->

<style>
.tree-view {
  flex: 1;
  list-style-type: none;
  padding-left: 1em;
}

.tree-view .item {
  cursor: pointer;
  line-height: 1.5;
  -webkit-user-select: none;
  user-select: none;
}
</style>
