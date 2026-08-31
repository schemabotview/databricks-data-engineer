import type { Scene } from '../../render-engine'
import { deltaVsParquet } from './delta-vs-parquet'
import { deltaLog } from './delta-log'
import { codeTimeTravel, codeSchema, codeMerge, codeMaintenance } from './code-scenes'
import { liquidClustering } from './liquid-clustering'
import { ucNamespace } from './uc-namespace'
import { managedVsExternal } from './managed-vs-external'
import { volumes } from './volumes'

// The delta-uc course's ten scenes, in syllabus order. §3–§6 are the SQL block — one code card each,
// the densest run of code in the concept; the other six are diagrams.
export const deltaUcScenes: Scene[] = [
  deltaVsParquet,
  deltaLog,
  codeTimeTravel,
  codeSchema,
  codeMerge,
  codeMaintenance,
  liquidClustering,
  ucNamespace,
  managedVsExternal,
  volumes,
]
