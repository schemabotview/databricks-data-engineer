import type { Scene } from '../../render-engine'
import { ingestionPatterns } from './ingestion-patterns'
import { autoLoader } from './auto-loader'
import { autoLoaderModes } from './auto-loader-modes'
import { ingestionCompare } from './ingestion-compare'
import { lakeflowConnect } from './lakeflow-connect'
import { inboundPaths } from './inbound-paths'
import { federation } from './federation'
import { ingestionDecision } from './ingestion-decision'
import { codeCopyInto, codeCloudfilesSchema, codeNestedJson } from './code-scenes'

// The ingestion course's eleven scenes, in syllabus order: the three patterns · COPY INTO (code) ·
// Auto Loader and its two discovery modes · the schema-evolution card · the head-to-head · Lakeflow
// Connect and the long-tail paths · nested JSON (code) · federation · the closing decision sheet.
export const ingestionScenes: Scene[] = [
  ingestionPatterns,
  codeCopyInto,
  autoLoader,
  autoLoaderModes,
  codeCloudfilesSchema,
  ingestionCompare,
  lakeflowConnect,
  inboundPaths,
  codeNestedJson,
  federation,
  ingestionDecision,
]
