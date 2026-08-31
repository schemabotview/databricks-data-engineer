import type { Scene } from '../../render-engine'

// §1 medallion — the exam tests ONE skill here: read a description, name the layer. So each layer's
// card carries its own defining property rather than a generic description, and the three run LR so
// the scene spans the pane instead of stacking into a ribbon. The `warn` closer is the rule students
// get wrong: many NARROW gold tables off the same silver, never one giant one.
export const medallion: Scene = {
  id: 'medallion',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      label: 'Read a description → name the layer',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'm-bronze',
          label: 'Bronze — raw',
          pattern: 'external',
          icon: 'database',
          sub: 'append-only · quality NOT enforced',
          children: [
            { id: 'm-b-audit', label: 'The audit copy', pattern: 'external', icon: 'scroll', variant: 'tile' },
          ],
        },
        {
          id: 'm-silver',
          label: 'Silver — conformed',
          pattern: 'network',
          icon: 'database',
          sub: 'deduplicated · quality ENFORCED',
          children: [
            { id: 'm-s-grain', label: 'Same grain', pattern: 'network', icon: 'layers', variant: 'tile' },
          ],
        },
        {
          id: 'm-gold',
          label: 'Gold — served',
          pattern: 'service',
          icon: 'database',
          sub: 'aggregated · tightest permissions',
          children: [
            { id: 'm-g-entity', label: 'One row / entity', pattern: 'service', icon: 'usercheck', variant: 'tile' },
          ],
        },
      ],
      edges: [
        { source: 'm-bronze', target: 'm-silver' },
        { source: 'm-silver', target: 'm-gold' },
      ],
    },
    {
      id: 'many-gold',
      label: 'Many NARROW gold tables',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'off the same silver — not one giant one',
    },
  ],
  edges: [{ source: 'layers', target: 'many-gold' }],
}
