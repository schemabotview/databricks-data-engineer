import type { Scene } from '../../render-engine'

// §8 audit-log — two system tables, and the point the narration ends on: this is queryable SQL, not
// just a UI, so you can build alerts and dashboards on access patterns the same way you would on any
// other table. The tells band is how the exam names each one.
export const auditLog: Scene = {
  id: 'audit-log',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'tables',
      label: 'system.access — the forensic source of truth',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'al-audit',
          label: 'audit',
          pattern: 'user',
          icon: 'scroll',
          sub: 'who · what · when · from where',
        },
        {
          id: 'al-lineage',
          label: 'table_lineage',
          pattern: 'network',
          icon: 'network',
          sub: 'job ↔ table, COLUMN-level',
        },
      ],
    },
    {
      id: 'tells',
      label: 'Two tells',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tl-who', label: '“who read it Tuesday?”', pattern: 'user', icon: 'scanface', sub: '→ audit' },
        { id: 'tl-lineage', label: '“column-level lineage”', pattern: 'network', icon: 'gitbranch', sub: '→ table_lineage' },
      ],
    },
    {
      id: 'its-sql',
      label: 'Queryable SQL',
      pattern: 'service',
      icon: 'terminal',
      sub: 'build alerts and dashboards on it',
    },
  ],
  edges: [
    { source: 'tables', target: 'tells' },
    { source: 'tells', target: 'its-sql' },
  ],
}
