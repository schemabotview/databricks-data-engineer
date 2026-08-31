import type { Scene } from '../../render-engine'

// §2 gold-objects — the five, each with the property that decides it: whether it STORES data, and
// what it is right for. The `warn` closer is the trade-off the exam tests directly — a view
// recomputes on every read, so a heavy aggregation read often wants an MV instead.
export const goldObjects: Scene = {
  id: 'gold-objects',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'objects',
      label: 'Five gold object types',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'o-table',
          label: 'Table',
          pattern: 'service',
          icon: 'table',
          sub: 'stored · full control of the write',
        },
        {
          id: 'o-view',
          label: 'View',
          pattern: 'user',
          icon: 'funnel',
          sub: 'NOT stored · a security barrier',
        },
        {
          id: 'o-mv',
          label: 'Materialized view',
          pattern: 'service',
          icon: 'repeat',
          sub: 'stored · auto-refreshed',
        },
        {
          id: 'o-st',
          label: 'Streaming table',
          pattern: 'network',
          icon: 'waves',
          sub: 'stored · continuous append',
        },
        {
          id: 'o-pipeline',
          label: 'MV / ST in a pipeline',
          pattern: 'service',
          icon: 'workflow',
          sub: 'adds quality + lineage',
        },
      ],
    },
    {
      id: 'view-tradeoff',
      label: 'A view RECOMPUTES',
      pattern: 'warn',
      icon: 'ban',
      sub: 'every read → heavy agg wants an MV',
    },
  ],
  edges: [{ source: 'objects', target: 'view-tradeoff' }],
}
