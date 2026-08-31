import type { Scene } from '../../render-engine'

// §10 gold-decision — the course closer, built like the platform and ingestion decision sheets:
// scenario in the label, the pick in the sub, cols:2 so six rows fill the pane. The slide carries all
// nine rows; this is the spine, weighted to the three "tells" the narration says unlock most
// questions — reads-a-lot-on-a-schedule, arrives-continuously, keep-full-history.
export const goldDecision: Scene = {
  id: 'gold-decision',
  padding: 0.18,
  nodes: [
    {
      id: 'sheet',
      label: 'Read the scenario → pick the object',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'gd-agg',
          label: 'Heavy agg, BI hourly',
          pattern: 'service',
          icon: 'repeat',
          sub: '→ Materialized view',
        },
        {
          id: 'gd-continuous',
          label: 'Arrives continuously',
          pattern: 'network',
          icon: 'waves',
          sub: '→ Streaming table',
        },
        {
          id: 'gd-pii',
          label: 'Wrapper / hide PII',
          pattern: 'user',
          icon: 'funnel',
          sub: '→ View (stores nothing)',
        },
        {
          id: 'gd-pipeline',
          label: 'Quality + lineage',
          pattern: 'service',
          icon: 'workflow',
          sub: '→ Declarative Pipeline',
        },
        {
          id: 'gd-history',
          label: 'Keep full history',
          pattern: 'service',
          icon: 'scroll',
          sub: '→ APPLY CHANGES, SCD TYPE 2',
        },
        {
          id: 'gd-check',
          label: 'Reject at write time',
          pattern: 'warn',
          icon: 'ban',
          sub: '→ CHECK constraint',
        },
      ],
    },
  ],
  edges: [],
}
