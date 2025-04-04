// SPDX-License-Identifier: MIT
// Copyright © 2025 André Santos

// Imports ---------------------------------------------------------------------

import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  LaunchActionType,
  type LaunchFile,
  type LaunchId,
  type LaunchIncludeAction,
} from '@/types/launch'

// Constants -------------------------------------------------------------------

const data: Record<LaunchId, LaunchFile> = {
  '001': {
    id: '001',
    name: 'robot.launch.py',
    actions: [
      { id: 'a001', type: LaunchActionType.ARG, name: 'use_sim_time', dependencies: [] },
      { id: 'a002', type: LaunchActionType.ARG, name: 'simple_arg', dependencies: [] },
      {
        id: 'a003',
        type: LaunchActionType.NODE,
        name: '/rviz2',
        dependencies: [],
      },
      {
        id: 'a004',
        type: LaunchActionType.INCLUDE,
        name: 'nav2_bringup/launch/bringup_launch.py',
        dependencies: ['a001'],
        actions: [
          {
            id: 'a005',
            type: LaunchActionType.ARG,
            name: 'dependent_arg',
            dependencies: [],
          },
          {
            id: 'a006',
            type: LaunchActionType.NODE,
            name: '/nav2_container',
            dependencies: ['a005'],
          },
          {
            id: 'a007',
            type: LaunchActionType.INCLUDE,
            name: 'example/launch/included_launch.py',
            dependencies: ['a005', 'a004'],
            actions: [
              {
                id: 'a008',
                type: LaunchActionType.ARG,
                name: 'dependent_arg',
                dependencies: [],
              },
              {
                id: 'a009',
                type: LaunchActionType.NODE,
                name: '/nav2_container',
                dependencies: ['a008'],
              },
            ],
          } as LaunchIncludeAction,
        ],
      } as LaunchIncludeAction,
    ],
  },
  '002': {
    id: '002',
    name: 'rviz2.launch.py',
    actions: [],
  },
  '003': {
    id: '003',
    name: 'turtlebot3_state_publisher.launch.py',
    actions: [],
  },
}

// Store -----------------------------------------------------------------------

export const useLaunchFileStore = defineStore('launch', () => {
  const launchFiles = ref<Record<LaunchId, LaunchFile>>(data)

  async function getLaunchFile(id: LaunchId): Promise<LaunchFile> {
    return Promise.resolve(launchFiles.value[id])
  }

  return {
    launchFiles,
    getLaunchFile,
  }
})

// Helper Functions ------------------------------------------------------------
