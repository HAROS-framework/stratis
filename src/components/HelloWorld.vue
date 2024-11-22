<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <h1 class="green">{{ msg }}</h1>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}
</style>
