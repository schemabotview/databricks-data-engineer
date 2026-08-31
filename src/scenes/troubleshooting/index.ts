import type { Scene } from '../../render-engine'
import { diagnosticFlow } from './diagnostic-flow'
import { runHistory } from './run-history'
import { sparkUi } from './spark-ui'
import { dataSkew } from './data-skew'
import { shuffle } from './shuffle'
import { diskSpill } from './disk-spill'
import { aqe } from './aqe'
import { predictiveOptimization } from './predictive-optimization'
import { commonFailures } from './common-failures'
import { oomPatterns } from './oom-patterns'

// The troubleshooting course's ten scenes — the only ALL-DIAGRAM course in the concept, because every
// section teaches a mechanism or a decision rather than syntax you would type. Nine of them share one
// spine: symptom → diagnosis → ranked remedy. In syllabus order: the diagnostic sequence, the two UIs
// that localise a problem, the three performance faults, AQE (which fixes all three), automated
// maintenance, and the two failure classes — startup/libraries and OOM.
export const troubleshootingScenes: Scene[] = [
  diagnosticFlow,
  runHistory,
  sparkUi,
  dataSkew,
  shuffle,
  diskSpill,
  aqe,
  predictiveOptimization,
  commonFailures,
  oomPatterns,
]
