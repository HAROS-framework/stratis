// SPDX-License-Identifier: MIT
// Copyright © 2025 André Santos

// Launch Files ----------------------------------------------------------------

export type LaunchId = string

export interface LaunchFile {
  id: LaunchId
  name: string
  actions: LaunchAction[]
}

// Actions ---------------------------------------------------------------------

export type LaunchActionId = string

export enum LaunchActionType {
  ARG = 'arg',
  NODE = 'node',
  INCLUDE = 'include',
}

export interface LaunchAction {
  id: LaunchActionId
  type: LaunchActionType
  name: string
  dependencies: LaunchActionId[]
}

export interface LaunchIncludeAction extends LaunchAction {
  type: LaunchActionType.INCLUDE
  actions: LaunchAction[]
}
