import type { Scene } from '../../render-engine'
import { securityHierarchy } from './security-hierarchy'
import { privileges } from './privileges'
import { abac } from './abac'
import { auditLog } from './audit-log'
import { accessControlDecision } from './access-control-decision'
import { codeGrants, codeMasking, codeRowFilters, codeDynamicViews } from './code-scenes'

// The governance course's nine scenes, in syllabus order: the permission tree and what each privilege
// buys · the SQL block (§3–§5: grants, column masks, row filters) · ABAC, which scales masks and
// filters by tag · the legacy dynamic view · the audit log · and the concept's closing decision sheet.
export const governanceScenes: Scene[] = [
  securityHierarchy,
  privileges,
  codeGrants,
  codeMasking,
  codeRowFilters,
  abac,
  codeDynamicViews,
  auditLog,
  accessControlDecision,
]
