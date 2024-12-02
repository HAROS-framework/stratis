<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { ref } from 'vue'

interface NodeDataType {
  id: string
  condition: string
}

const selectedNode = ref<NodeDataType | null>(null)
</script>

<template>
  <div class="computation-graph">
    <div class="header">
      <h2>Computation Graph</h2>
      <div class="toolbar">
        <button>Zoom -</button>
        <button>Zoom +</button>
      </div>
    </div>
    <div class="panel" ref="computationGraphContainer">
      <p class="floating-label">
        Selected node:
        {{ !!selectedNode ? selectedNode.id : 'none' }}
        <span v-if="!!selectedNode" class="annotation">
          {{ !selectedNode.condition ? 'always on' : 'conditional' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style>
.computation-graph {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.computation-graph > .header {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.computation-graph > .header > h2 {
  flex: 1;
}

.computation-graph > .header > .toolbar {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.computation-graph > .header > .toolbar > button {
  flex: 0 0 auto;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: 0.25s;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.computation-graph > .header > .toolbar > button:hover {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-green);
  color: var(--color-heading);
}

.computation-graph > .panel {
  flex: 1;
  position: relative;
}

.computation-graph > .panel > .floating-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-green-hover);
  color: var(--color-heading);
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  pointer-events: none;
}
</style>
