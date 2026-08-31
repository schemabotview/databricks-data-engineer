import type { Course } from '../types'
import { whyDelta } from './01-why-delta'
import { transactionLog } from './02-transaction-log'
import { timeTravel } from './03-time-travel'
import { schema } from './04-schema'
import { merge } from './05-merge'
import { maintenance } from './06-maintenance'
import { liquidClustering } from './07-liquid-clustering'
import { ucNamespace } from './08-uc-namespace'
import { managedVsExternal } from './09-managed-vs-external'
import { volumes } from './10-volumes'

// delta-uc — the two foundation layers the rest of the concept stands on. Ten sections: why Delta
// exists and how its log buys ACID, then the SQL block (§3–§6: time travel · schema · MERGE ·
// maintenance), then Liquid Clustering and the Unity Catalog side — namespace, table flavours, and
// volumes. Course COMPLETE. See ../../COURSE-PLAN.md.
export const deltaUc: Course = {
  id: 'delta-uc',
  title: 'Delta Lake & Unity Catalog Foundations',
  sections: [
    whyDelta,
    transactionLog,
    timeTravel,
    schema,
    merge,
    maintenance,
    liquidClustering,
    ucNamespace,
    managedVsExternal,
    volumes,
  ],
}
