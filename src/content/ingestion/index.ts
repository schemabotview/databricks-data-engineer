import type { Course } from '../types'
import { threePatterns } from './01-three-patterns'
import { copyInto } from './02-copy-into'
import { autoLoader } from './03-auto-loader'
import { listingVsNotification } from './04-listing-vs-notification'
import { schemaEvolution } from './05-schema-evolution'
import { copyIntoVsAutoLoader } from './06-copy-into-vs-auto-loader'
import { lakeflowConnect } from './07-lakeflow-connect'
import { otherInbound } from './08-other-inbound'
import { nestedJson } from './09-nested-json'
import { federation } from './10-federation'
import { decisionSheet } from './11-decision-sheet'

// ingestion — getting data in, and the exam's joint-heaviest domain (21%). Eleven sections: the three
// patterns, then the two file paths (COPY INTO · Auto Loader, with its discovery modes and schema
// evolution) and their head-to-head, then the non-file paths (Lakeflow Connect · the long tail ·
// federation), closing on the decision sheet. Course COMPLETE. See ../../COURSE-PLAN.md.
export const ingestion: Course = {
  id: 'ingestion',
  title: 'Data Ingestion',
  sections: [
    threePatterns,
    copyInto,
    autoLoader,
    listingVsNotification,
    schemaEvolution,
    copyIntoVsAutoLoader,
    lakeflowConnect,
    otherInbound,
    nestedJson,
    federation,
    decisionSheet,
  ],
}
