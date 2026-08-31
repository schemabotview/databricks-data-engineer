import type { Scene } from '../../render-engine'

// §3 materialized-view — the mechanism LR, because what makes an MV an MV is that the result is
// STORED between the query and the reader. The chain stops at the stored result rather than running
// on to a BI node: four cards LR ran ~1016 wide against ~390 tall (a 2.6 ribbon), and "cheap for BI"
// is already carried below. The buys band is cols:2 so it adds height instead of width. The schedule
// sits in the container sub, since "the cadence lives with the object" is the distinguishing claim.
export const materializedView: Scene = {
  id: 'materialized-view',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'mv-flow',
      label: 'Computed once, stored as Delta, auto-refreshed',
      pattern: 'group',
      sub: 'SCHEDULE EVERY 1 HOUR — the cadence lives WITH the object',
      flow: 'LR',
      children: [
        { id: 'mv-src', label: 'Silver tables', pattern: 'network', icon: 'database', sub: 'the base tables' },
        { id: 'mv-query', label: 'The query', pattern: 'service', icon: 'braces', sub: 'a heavy aggregation' },
        { id: 'mv-stored', label: 'Stored result', pattern: 'service', icon: 'table', sub: 'Delta, read like a table' },
      ],
      edges: [
        { source: 'mv-src', target: 'mv-query' },
        { source: 'mv-query', target: 'mv-stored' },
      ],
    },
    {
      id: 'mv-buys',
      label: 'What it buys',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'mv-incr', label: 'Incremental refresh', pattern: 'service', icon: 'repeat', variant: 'tile' },
        { id: 'mv-consistent', label: 'Consistent reads', pattern: 'service', icon: 'shieldcheck', variant: 'tile' },
        { id: 'mv-cheap', label: 'Cheap for BI', pattern: 'service', icon: 'gauge', variant: 'tile' },
        { id: 'mv-schedule', label: 'Schedule with the object', pattern: 'user', icon: 'clock', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'mv-flow', target: 'mv-buys' }],
}
