import type { Scene } from '../../render-engine'

// §9 access-control-decision — the concept's FINAL scene. Built like every other closing sheet:
// scenario in the label, the control in the sub, cols:2. Weighted to the three tells the narration
// says unlock most questions — the read-access trio, which-columns vs. which-rows vs. across-many,
// and the system.access schema for anything about who accessed or lineage.
export const accessControlDecision: Scene = {
  id: 'access-control-decision',
  padding: 0.18,
  nodes: [
    {
      id: 'sheet',
      label: 'Read the scenario → pick the control',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'ac-read',
          label: 'Analysts read gold',
          pattern: 'service',
          icon: 'key',
          sub: '→ USE CATALOG + USE SCHEMA + SELECT',
        },
        {
          id: 'ac-block',
          label: 'Block one table',
          pattern: 'warn',
          icon: 'ban',
          sub: '→ DENY — it beats GRANT',
        },
        {
          id: 'ac-columns',
          label: 'Which columns’ values',
          pattern: 'user',
          icon: 'funnel',
          sub: '→ Column mask',
        },
        {
          id: 'ac-rows',
          label: 'Which rows',
          pattern: 'user',
          icon: 'layers',
          sub: '→ Row filter',
        },
        {
          id: 'ac-many',
          label: 'Across 100s of tables',
          pattern: 'service',
          icon: 'tag',
          sub: '→ UC ABAC',
        },
        {
          id: 'ac-audit',
          label: 'Who read it, or lineage',
          pattern: 'network',
          icon: 'scroll',
          sub: '→ the system.access schema',
        },
      ],
    },
    {
      id: 'instinct',
      label: 'When answers compete',
      pattern: 'service',
      icon: 'circlecheck',
      sub: 'pick the managed, base-table one',
    },
  ],
  edges: [{ source: 'sheet', target: 'instinct' }],
}
