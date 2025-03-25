// SPDX-License-Identifier: MIT
// Copyright © 2025 André Santos

// Imports ---------------------------------------------------------------------

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Workspace } from '@/types/workspace'

// Constants -------------------------------------------------------------------

const defaultWorkspace: Workspace = {
  id: '',
  name: 'workspace',
  packages: [],
  components: [],
  launch: [],
  issues: [],
}

// Store -----------------------------------------------------------------------

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref<Workspace>(defaultWorkspace)

  function setWorkspace(ws: Workspace): void {
    workspace.value = ws
  }

  return {
    workspace,
    setWorkspace,
  }
})

// Helper Functions ------------------------------------------------------------
