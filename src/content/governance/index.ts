import type { Course } from '../types'
import { securityHierarchy } from './01-security-hierarchy'
import { privileges } from './02-privileges'
import { grantRevoke } from './03-grant-revoke'
import { columnMasking } from './04-column-masking'
import { rowFilters } from './05-row-filters'
import { abac } from './06-abac'
import { dynamicViews } from './07-dynamic-views'
import { auditLog } from './08-audit-log'
import { decisionSheet } from './09-decision-sheet'

// governance — exam domain 7 (15%), and the concept's FINAL course. Nine sections: the permission
// tree and what each privilege buys, the SQL block (grants, column masks, row filters), ABAC which
// scales those by tag, the legacy dynamic view, the audit log, and the closing decision sheet — whose
// narration ends the whole concept. Course COMPLETE.
export const governance: Course = {
  id: 'governance',
  title: 'Governance & Security',
  sections: [
    securityHierarchy,
    privileges,
    grantRevoke,
    columnMasking,
    rowFilters,
    abac,
    dynamicViews,
    auditLog,
    decisionSheet,
  ],
}
