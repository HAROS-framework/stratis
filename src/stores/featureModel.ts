// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

// Imports ---------------------------------------------------------------------

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  FeatureId,
  FeatureModelDescription,
  LaunchFeatureDescription,
  LaunchFeatureInstance,
} from '@/types/runtime'

// Constants -------------------------------------------------------------------

const defaultFeatureModel: FeatureModelDescription = {
  id: 'default',
  name: 'Feature Model',
  launch: [
    {
      id: 'launch:0001',
      name: 'launch_file_1.py',
      args: [
        {
          id: 'arg:0001:0001',
          name: 'arg1',
          defaultValue: 'true',
          knownValues: ['true', 'false'],
        },
        {
          id: 'arg:0001:0002',
          name: 'arg2',
          defaultValue: '',
          knownValues: [],
        },
      ],
    },
    {
      id: 'launch:0002',
      name: 'launch_file_2.py',
      args: [
        {
          id: 'arg:0002:0001',
          name: 'arg1',
          defaultValue: '',
          knownValues: [],
        },
      ],
    },
  ],
}

// Feature Model Internal Data -------------------------------------------------

export interface ConfigurableLaunchFeature {
  name: string
  selected: boolean | null
  args: Record<string, ConfigurableArgFeature>
}

export interface ConfigurableArgFeature {
  name: string
  value: string
  defaultValue: string | null
  knownValues: string[]
}

// Store -----------------------------------------------------------------------

export const useFeatureModelStore = defineStore('featureModel', () => {
  const featureModel = ref<FeatureModelDescription>(defaultFeatureModel)
  const name = ref<string>('Custom Configuration')
  const launch = ref<Record<FeatureId, LaunchFeatureInstance>>({})

  function setName(newName: string): void {
    name.value = newName
  }

  function setModelDescription(fm: FeatureModelDescription): void {
    featureModel.value = fm
    launch.value = {}
    for (const desc of fm.launch) {
      launch.value[desc.id] = launchInstanceFromDescription(desc)
    }
  }

  function getLaunchInstance(id: string): LaunchFeatureInstance {
    return launch.value[id]
  }

  function setLaunchInstance(id: FeatureId, instance: LaunchFeatureInstance): void {
    launch.value[id] = instance
  }

  return {
    featureModel,
    name,
    launch,
    setName,
    setModelDescription,
    getLaunchInstance,
    setLaunchInstance,
  }
})

// Helper Functions ------------------------------------------------------------

function launchInstanceFromDescription(launch: LaunchFeatureDescription): LaunchFeatureInstance {
  const args: Record<FeatureId, string> = {}
  for (const arg of launch.args) {
    args[arg.id] = arg.defaultValue
  }
  return { selected: false, args }
}
