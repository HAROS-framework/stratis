<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
// Imports ---------------------------------------------------------------------

import { ref } from 'vue'

// Constants -------------------------------------------------------------------

const issues = [
  'Something bad',
  'Something really bad',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
  'Something smelly',
]

// Component State -------------------------------------------------------------

const selectedIssue = ref<number>(0)

// Component Methods -----------------------------------------------------------

function onSelectIssue(i: number): void {
  selectedIssue.value = i
}

/*const vscode = window.acquireVsCodeApi != null ? window.acquireVsCodeApi() : null

function openFile(filePath: string) {
  if (vscode != null) {
    selectedIssue.value = 3
    console.log('vscode')
    vscode.postMessage({ command: 'openFile', filePath })
  }
}*/
</script>

<template>
  <div class="issues-view">
    <ul class="left-side panel">
      <li
        v-for="(issue, i) in issues"
        :key="i"
        :class="{ active: selectedIssue == i }"
        @click="onSelectIssue(i)"
      >
        Issue #{{ i }}
      </li>
    </ul>

    <div class="right-side panel">
      <h2 v-if="!!issues[selectedIssue]">
        {{ issues[selectedIssue] }}
      </h2>
      <p>A more detailed issue description will go here.</p>
      <a
        href="vscode://file/C:/Users/afariasa/Software/stratis/src/views/RuntimeView.vue:9:1"
        target="_blank"
      >
        <pre>src/path/to/file.cpp:42</pre>
      </a>
    </div>
  </div>
</template>

<style>
.issues-view {
  height: 100%;
  flex: 1;
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
}

.issues-view > .left-side {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  background-color: var(--color-background-mute);
}

.issues-view > .left-side > li {
  cursor: pointer;
  padding: 0 0.5rem;
}

.issues-view > .left-side > li:hover {
  background-color: var(--color-green-hover);
  color: var(--color-green);
}

.issues-view > .left-side > li.active {
  background-color: var(--color-border);
  color: var(--color-heading);
}

.issues-view > .left-side > li.active:hover {
  background-color: var(--color-green-hover);
  color: var(--color-heading);
}

.issues-view > .right-side {
  height: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;
}

.issues-view > .right-side > .panel {
  flex: 1;
}
</style>
