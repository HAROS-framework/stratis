// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

// Feature Model ---------------------------------------------------------------

export interface FeatureDescription {
  id: string
  name: string
}

export interface LaunchFeatureDescription extends FeatureDescription {
  arguments: ArgFeatureDescription[]
}

export interface ArgFeatureDescription extends FeatureDescription {
  defaultValue: string | null
  values: string[]
}

export interface FeatureModelDescription {
  name: string
  launch: LaunchFeatureDescription[]
}

// Computation Graph -----------------------------------------------------------
