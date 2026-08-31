import type { Scene } from '../../render-engine'

// §7 sql-warehouses — the three warehouse types on top, then the section's wider point below:
// serverless is a MODALITY available across four surfaces, not a fourth warehouse type. Drawing the
// four surfaces as tiles is what stops "serverless" reading as a SQL-only feature.
export const sqlWarehouses: Scene = {
  id: 'sql-warehouses',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'warehouse',
      label: 'SQL warehouse — compute for SQL & BI',
      pattern: 'service',
      icon: 'database',
      sub: 'Databricks SQL · dashboards · editor · Power BI · autoscales with load',
      cols: 3,
      children: [
        {
          id: 'wh-classic',
          label: 'Classic',
          pattern: 'network',
          icon: 'server',
          sub: 'runs in YOUR account',
        },
        {
          id: 'wh-pro',
          label: 'Pro',
          pattern: 'network',
          icon: 'server',
          sub: 'YOUR account + features',
        },
        {
          id: 'wh-serverless',
          label: 'Serverless',
          pattern: 'service',
          icon: 'zap',
          sub: 'Databricks’ account, starts in secs',
        },
      ],
    },
    {
      id: 'modality',
      label: 'Serverless is a MODALITY, not a product',
      pattern: 'group',
      sub: 'managed · seconds to start · scales to zero, no idle cost',
      cols: 4,
      children: [
        { id: 'sv-sql', label: 'SQL warehouses', pattern: 'service', icon: 'database', variant: 'tile' },
        { id: 'sv-jobs', label: 'Jobs', pattern: 'service', icon: 'workflow', variant: 'tile' },
        { id: 'sv-notebooks', label: 'Notebooks', pattern: 'service', icon: 'code', variant: 'tile' },
        { id: 'sv-pipelines', label: 'Pipelines', pattern: 'service', icon: 'waves', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'wh-serverless', target: 'modality', label: 'the same idea, everywhere' }],
}
