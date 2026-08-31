import type { Course } from '../types'
import { diagnosticFlow } from './01-diagnostic-flow'
import { runHistory } from './02-run-history'
import { sparkUi } from './03-spark-ui'
import { dataSkew } from './04-data-skew'
import { shuffle } from './05-shuffle'
import { spill } from './06-spill'
import { aqe } from './07-aqe'
import { autoMaintenance } from './08-auto-maintenance'
import { commonFailures } from './09-common-failures'
import { oom } from './10-oom'

// troubleshooting — exam domain 6 (10%), and the only ALL-DIAGRAM course: every section teaches a
// mechanism or a decision, none teaches syntax. Ten sections following one running example
// (silver_build, 12 min → 38): the coarse-to-fine diagnostic sequence, the two UIs that localise a
// problem, the three performance faults, AQE (which fixes all three), automated maintenance, and the
// two failure classes. Course COMPLETE.
export const troubleshooting: Course = {
  id: 'troubleshooting',
  title: 'Troubleshooting, Monitoring & Optimization',
  sections: [
    diagnosticFlow,
    runHistory,
    sparkUi,
    dataSkew,
    shuffle,
    spill,
    aqe,
    autoMaintenance,
    commonFailures,
    oom,
  ],
}
