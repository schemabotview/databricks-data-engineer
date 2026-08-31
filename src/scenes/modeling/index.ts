import type { Scene } from '../../render-engine'
import { medallion } from './medallion'
import { goldObjects } from './gold-objects'
import { materializedView } from './materialized-view'
import { streamingTable } from './streaming-table'
import { pipelineModes } from './pipeline-modes'
import { goldPatterns } from './gold-patterns'
import { goldDecision } from './gold-decision'
import { codePipeline, codeExpectations, codeApplyChanges } from './code-scenes'

// The modeling course's ten scenes, in syllabus order: the medallion layers · the five gold object
// types · the two that need their own mechanism (MV and streaming table) · the pipeline code block
// (§5–§7) · pipeline modes · the gold shapes · the closing decision sheet.
export const modelingScenes: Scene[] = [
  medallion,
  goldObjects,
  materializedView,
  streamingTable,
  codePipeline,
  codeExpectations,
  codeApplyChanges,
  pipelineModes,
  goldPatterns,
  goldDecision,
]
