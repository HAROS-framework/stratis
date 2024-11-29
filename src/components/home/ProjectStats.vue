<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import IconCogwheel from '../icons/IconCogwheel.vue'
import IconDiagram from '../icons/IconDiagram.vue'
import IconPackage from '../icons/IconPackage.vue'
import IconWarning from '../icons/IconWarning.vue'
</script>

<template>
  <ul class="project-stats">
    <li class="panel issues">
      <IconWarning />
      <div class="label">
        Issues
        <span class="value">1234</span>
      </div>
    </li>

    <li class="panel packages">
      <IconPackage class="stroke" />
      <div class="label">
        Packages
        <span class="value">20</span>
      </div>
    </li>

    <li class="panel nodes">
      <IconCogwheel />
      <div class="label">
        Nodes
        <span class="value">12</span>
      </div>
    </li>

    <li class="panel launch">
      <IconDiagram />
      <div class="label">
        Launch Files
        <span class="value">123</span>
      </div>
    </li>
  </ul>
</template>

<style>
.project-stats {
  display: grid;
  grid-template-columns: 1fr;
  list-style: none;
  padding: 0;
  row-gap: 1rem;
}

.project-stats > li {
  padding: 0.5rem;
  position: relative;
  overflow: hidden;
  background-color: var(--color-border);
  color: var(--color-heading);
}

/*.project-stats > li:hover {
  background-color: var(--color-border);
  color: var(--color-heading);
}*/

.project-stats > li > .label {
  position: relative;
}

.project-stats > li > svg {
  height: 150%;
  /*fill: var(--color-background-mute);*/
  fill: var(--color-background-soft);
  position: absolute;
  top: -35%;
  right: -2rem;
  pointer-events: none;
}

/*.project-stats > li:hover > svg {
  fill: var(--color-background-soft);
}*/

.project-stats > li > svg.stroke {
  fill: none;
  /*stroke: var(--color-background-mute);*/
  stroke: var(--color-background-soft);
}

/*.project-stats > li:hover > svg.stroke {
  stroke: var(--color-background-soft);
}*/

.project-stats > li > .label > .value {
  display: block;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-green);
  line-height: 1.25;
}

@media (min-width: 1024px) {
  .project-stats {
    grid-template-columns: 1fr 1fr;
    row-gap: 1.5rem;
    column-gap: 1rem;
  }

  .project-stats > li {
    font-size: 1.25rem;
  }

  .project-stats > li > .label > .value {
    font-size: 2rem;
  }
}
</style>
