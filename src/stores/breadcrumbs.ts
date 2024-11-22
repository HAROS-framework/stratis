// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumbs', () => {
  const crumbs = ref<string[]>([])

  function setBreadcrumbs(newCrumbs: string[]): void {
    crumbs.value = newCrumbs
  }

  function pushBreadcrumb(crumb: string): void {
    crumbs.value = crumbs.value.concat(crumb)
  }

  return { crumbs, setBreadcrumbs, pushBreadcrumb }
})
