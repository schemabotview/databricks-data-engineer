import type { Course } from '../types'
import { medallion } from './01-medallion'
import { goldObjects } from './02-gold-objects'
import { materializedViews } from './03-materialized-views'
import { streamingTables } from './04-streaming-tables'
import { declarativePipelines } from './05-declarative-pipelines'
import { expectations } from './06-expectations'
import { applyChanges } from './07-apply-changes'
import { pipelineModes } from './08-pipeline-modes'
import { goldPatterns } from './09-gold-patterns'
import { decisionSheet } from './10-decision-sheet'

// modeling — the medallion layers and the objects that build gold, completing the exam's heaviest
// domain (Transformation & Modeling, 22%) with the transformations course. Ten sections: the layers,
// the five gold objects, MV and streaming table in detail, the pipeline code block (§5–§7), pipeline
// modes, the gold shapes, and the closing decision sheet. Course COMPLETE.
export const modeling: Course = {
  id: 'modeling',
  title: 'Medallion, MVs, Streaming Tables & Declarative Pipelines',
  sections: [
    medallion,
    goldObjects,
    materializedViews,
    streamingTables,
    declarativePipelines,
    expectations,
    applyChanges,
    pipelineModes,
    goldPatterns,
    decisionSheet,
  ],
}
