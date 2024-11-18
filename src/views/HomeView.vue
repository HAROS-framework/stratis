<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumbs'

const crumbStore = useBreadcrumbStore()
crumbStore.setBreadcrumbs(['home'])
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
