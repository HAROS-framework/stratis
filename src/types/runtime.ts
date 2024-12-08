// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

// Feature Model ---------------------------------------------------------------

export type FeatureId = string

export interface FeatureDescription {
  id: FeatureId
  name: string
}

export interface LaunchFeatureDescription extends FeatureDescription {
  args: ArgFeatureDescription[]
}

export interface ArgFeatureDescription extends FeatureDescription {
  defaultValue: string // empty means none
  knownValues: string[]
}

export type FeatureModelId = string

export interface FeatureModelDescription {
  id: FeatureModelId
  name: string
  launch: LaunchFeatureDescription[]
}

// Feature Model Instantiation -------------------------------------------------

export interface FeatureInstance {
  // id: FeatureId
  selected: boolean | null
}

export interface LaunchFeatureInstance extends FeatureInstance {
  args: Record<FeatureId, string> // id: value (empty means unknown)
}

export interface FeatureModelInstance {
  id: FeatureModelId // of the corresponding description
  name: string // of this particular instance
  launch: Record<FeatureId, LaunchFeatureInstance>
}

// Computation Graph -----------------------------------------------------------
