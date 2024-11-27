<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts"></script>

<template>
  <div class="project-selector">
    <div class="header">
      <h2>Project</h2>
      <button>New</button>
      <button>Load</button>
    </div>
    <p>Project Name</p>
  </div>
</template>

<style>
.project-selector {
  color: var(--color-text);
}

.project-selector > .header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1rem;
}

.project-selector > .header > h2 {
  flex: 1;
  color: var(--color-heading);
}

.project-selector > .header > button {
  flex: 0 0 auto;
  font-size: 0.8rem;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: 0.25s;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.project-selector > .header > button:hover {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-green);
  color: var(--color-heading);
}

.project-selector > p {
  padding-left: 0.5rem;
}

@media (min-width: 1024px) {
  .project-selector > .header > button {
    font-size: 1rem;
    padding: 0.25rem 1rem;
  }
}
</style>
