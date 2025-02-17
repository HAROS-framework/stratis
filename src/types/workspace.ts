// SPDX-License-Identifier: MIT
// Copyright © 2025 André Santos

// Workspace -------------------------------------------------------------------

export type WorkspaceId = string

export interface Workspace {
  id: WorkspaceId
  name: string
  packages: PackageSummary[]
  components: ComponentSummary[]
  launch: LaunchFileSummary[]
  issues: IssueSummary[]
}

// Packages --------------------------------------------------------------------

export type PackageId = string

export interface PackageSummary {
  id: PackageId
  name: string
}

export interface PackageDetails {
  id: PackageId
}

// Components ------------------------------------------------------------------

export type ComponentId = string

export enum ComponentType {
  NODE,
  PLUGIN,
}

export interface ComponentSummary {
  id: ComponentId
  type: ComponentType
  name: string
}

export interface ComponentDetails {
  id: ComponentId
}

// Launch Files ----------------------------------------------------------------

export type LaunchFileId = string

export interface LaunchFileSummary {
  id: LaunchFileId
}

export interface LaunchFileDetails {
  id: LaunchFileId
}

// Issues ----------------------------------------------------------------------

export type IssueId = string

export interface IssueSummary {
  id: IssueId
}

export interface IssueDetails {
  id: IssueId
}
