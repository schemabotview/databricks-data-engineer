import type { Scene } from '../../render-engine'
import { lakehouseEvolution } from './lakehouse-evolution'
import { platformPillars } from './platform-pillars'
import { twoPlanes } from './two-planes'
import { platformStack } from './platform-stack'
import { workspace } from './workspace'
import { clusters } from './clusters'
import { sqlWarehouses } from './sql-warehouses'
import { computeDecision } from './compute-decision'
import { costModel } from './cost-model'
import { runtimePhoton } from './runtime-photon'

// The platform course's ten scenes, one per section, in syllabus order: the lakehouse argument · the
// product's three pillars · the control/compute split · the technical stack · the workspace (inside
// the account, where the metastore lives) · then the compute block — clusters, SQL warehouses, and
// the decision sheet — closing on cost and the runtime.
export const platformScenes: Scene[] = [
  lakehouseEvolution,
  platformPillars,
  twoPlanes,
  platformStack,
  workspace,
  clusters,
  sqlWarehouses,
  computeDecision,
  costModel,
  runtimePhoton,
]
