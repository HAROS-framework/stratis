<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright © 2024 André Santos -->

<script setup lang="ts">
import { ref } from 'vue'
const name = ref<string>('Stratis')
const count = ref<number>(0)

function increment(): void {
  count.value++
}

function resetCount(): void {
  count.value = 0
}
</script>

<template>
  <div class="source">
    <h1>Hello, {{  name }}</h1>
    <p>Click counter: {{ count }} times.</p>
    <button @click="increment">Click Me</button>
    <div>
      <button @click="resetCount">Reset count</button>
    </div>
  </div>
</template>

<style></style>
