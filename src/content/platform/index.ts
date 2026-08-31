import type { Course } from '../types'
import { whyTheLakehouse } from './01-why-the-lakehouse'
import { thePlatform } from './02-the-platform'
import { twoPlanes } from './03-two-planes'
import { theStack } from './04-the-stack'
import { theWorkspace } from './05-the-workspace'
import { clusters } from './06-clusters'
import { sqlWarehouses } from './07-sql-warehouses'
import { choosingCompute } from './08-choosing-compute'
import { costModel } from './09-cost-model'
import { runtimePhoton } from './10-runtime-photon'

// platform — the Data Intelligence Platform and the compute you run it on. Ten sections: the
// lakehouse argument, the product's three pillars, the control/compute split, the technical stack,
// the workspace, then the compute block (clusters · SQL warehouses · the decision sheet), closing on
// cost and the runtime. Course COMPLETE. See ../../COURSE-PLAN.md.
export const platform: Course = {
  id: 'platform',
  title: 'Data Intelligence Platform & Compute',
  sections: [
    whyTheLakehouse,
    thePlatform,
    twoPlanes,
    theStack,
    theWorkspace,
    clusters,
    sqlWarehouses,
    choosingCompute,
    costModel,
    runtimePhoton,
  ],
}
