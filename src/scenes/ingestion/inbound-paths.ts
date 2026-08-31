import type { Scene } from '../../render-engine'

// §8 inbound-paths — the long tail. The REST closer is a `warn` because it is the section's one real
// trap: REST is a LANDING strategy, not a target. Once the JSON is a file on storage the normal
// ingestion logic takes over, with its idempotency and schema evolution intact.
export const inboundPaths: Scene = {
  id: 'inbound-paths',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'paths',
      label: 'Three more paths cover the long tail',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'partner',
          label: 'Partner connectors',
          pattern: 'external',
          icon: 'plug',
          sub: 'Fivetran · Airbyte, via Partner Connect',
        },
        {
          id: 'jdbc',
          label: 'JDBC / ODBC',
          pattern: 'network',
          icon: 'database',
          sub: 'a pull from an operational DB',
        },
        {
          id: 'rest',
          label: 'REST API',
          pattern: 'external',
          icon: 'braces',
          sub: 'paginate · auth from secrets',
        },
      ],
    },
    {
      id: 'rules',
      label: 'What the exam insists on',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-managed', label: 'Prefer managed', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
        { id: 'r-secrets', label: 'Secret scope', pattern: 'user', icon: 'key', variant: 'tile' },
        { id: 'r-partition', label: 'partitionColumn', pattern: 'network', icon: 'layers', variant: 'tile' },
      ],
    },
    {
      id: 'rest-rule',
      label: 'REST is a LANDING step',
      pattern: 'warn',
      icon: 'ban',
      sub: 'JSON → a volume, THEN Auto Loader',
    },
  ],
  edges: [
    { source: 'paths', target: 'rules' },
    { source: 'rules', target: 'rest-rule' },
  ],
}
