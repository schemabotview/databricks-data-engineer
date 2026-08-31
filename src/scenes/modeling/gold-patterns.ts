import type { Scene } from '../../render-engine'

// §9 gold-patterns — the choice is made by CONSUMER, so each side names its reader rather than its
// shape alone. The closing band is the bank's actual layout, which is where the whole course lands:
// every object type from §2 chosen for a real table, with its refresh pattern attached.
export const goldPatterns: Scene = {
  id: 'gold-patterns',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      label: 'Choose by CONSUMER',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'star',
          label: 'Star schema',
          pattern: 'network',
          icon: 'network',
          sub: 'a fact + conformed dimensions → BI tools',
          cols: 2,
          children: [
            { id: 'star-fact', label: 'fact_transactions', pattern: 'network', icon: 'table', variant: 'tile' },
            { id: 'star-dim', label: 'dim_customer', pattern: 'network', icon: 'usercheck', variant: 'tile' },
            { id: 'star-merch', label: 'dim_merchant', pattern: 'network', icon: 'building', variant: 'tile' },
            { id: 'star-date', label: 'dim_date', pattern: 'network', icon: 'clock', variant: 'tile' },
          ],
        },
        {
          id: 'obt',
          label: 'Wide rollup (OBT)',
          pattern: 'service',
          icon: 'table',
          sub: 'one row per entity → ad-hoc and ML',
          children: [
            { id: 'obt-360', label: 'customer_360', pattern: 'service', icon: 'usercheck', sub: '30+ metrics, no joins' },
            { id: 'obt-cost', label: 'Pricier refresh', pattern: 'warn', icon: 'gauge', sub: 'the cost of no joins' },
          ],
        },
      ],
    },
    {
      id: 'bank-layout',
      label: 'The bank’s gold layout — object matched to refresh',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'bl-360', label: 'customer_360 → MV', pattern: 'service', icon: 'repeat', variant: 'tile' },
        { id: 'bl-vol', label: 'daily_volume → ST', pattern: 'network', icon: 'waves', variant: 'tile' },
        { id: 'bl-dim', label: 'dim_customer → SCD 2', pattern: 'user', icon: 'scroll', variant: 'tile' },
        { id: 'bl-fact', label: 'fact_txns → SCD 1', pattern: 'network', icon: 'table', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'shapes', target: 'bank-layout' }],
}
