// SPDX-License-Identifier: MIT
// Copyright © 2025 André Santos

// Workspace -------------------------------------------------------------------

export type WorkspaceId = string

export interface Workspace {
  id: WorkspaceId
  name: string
  components: ComponentSummary[]
  launch: LaunchFileSummary[]
  issues: IssueSummary[]
}

// Components ------------------------------------------------------------------

export type ComponentId = string

export interface ComponentSummary {
  id: ComponentId
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
