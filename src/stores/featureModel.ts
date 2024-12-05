// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

// Imports ---------------------------------------------------------------------

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FeatureModelDescription, LaunchFeatureDescription } from '@/types/runtime'

// Internal Type Definitions ---------------------------------------------------

export interface FeatureInstance {
  id: string
  selected: boolean | null
}

export interface LaunchFeatureInstance extends FeatureInstance {
  arguments: Record<string, ArgFeatureInstance>
}

export interface ArgFeatureInstance extends FeatureInstance {
  value: string | null
}

// Store -----------------------------------------------------------------------

export const useFeatureModelStore = defineStore('featureModel', () => {
  const name = ref<string>('')
  const descriptions = ref<Record<string, LaunchFeatureDescription>>({})
  const launch = ref<Record<string, LaunchFeatureInstance>>({})

  function setModelFromDescription(fm: FeatureModelDescription): void {
    name.value = fm.name
    descriptions.value = {}
    launch.value = {}
    for (const desc of fm.launch) {
      descriptions.value[desc.id] = desc
      launch.value[desc.id] = launchInstanceFromDescription(desc)
    }
  }

  return { name, descriptions, launch, setModelFromDescription }
})

// Helper Functions ------------------------------------------------------------

function launchInstanceFromDescription(desc: LaunchFeatureDescription): LaunchFeatureInstance {
  const args: Record<string, ArgFeatureInstance> = {}
  const instance: LaunchFeatureInstance = { id: desc.id, arguments: args, selected: false }
  for (const arg of desc.arguments) {
    args[arg.id] = { id: arg.id, selected: false, value: null }
  }
  return instance
}
