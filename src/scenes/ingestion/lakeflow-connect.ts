import type { Scene } from '../../render-engine'

// §7 lakeflow-connect — the three tiers are PEERS (all land in UC-governed Delta); what differs is
// who operates the moving parts, which is why the subs read as operator rather than capability. The
// managed band below names real connectors, because the exam asks by source name.
export const lakeflowConnect: Scene = {
  id: 'lakeflow-connect',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'tiers',
      label: 'Operational systems → Lakeflow Connect · three peer tiers',
      pattern: 'group',
      sub: 'all three land in Unity-Catalog-governed Delta tables',
      cols: 3,
      children: [
        {
          id: 't-managed',
          label: 'Managed',
          pattern: 'service',
          icon: 'shieldcheck',
          sub: 'Databricks runs the pipeline',
        },
        {
          id: 't-standard',
          label: 'Standard',
          pattern: 'network',
          icon: 'code',
          sub: 'Auto Loader / Streaming — you write it',
        },
        {
          id: 't-partner',
          label: 'Partner',
          pattern: 'external',
          icon: 'plug',
          sub: 'Fivetran · Airbyte · dbt',
        },
      ],
    },
    {
      id: 'managed-sources',
      label: 'Managed — the low-effort default when the source is supported',
      pattern: 'service',
      icon: 'plug',
      sub: 'least ops · native CDC · lands pre-governed in UC',
      cols: 5,
      children: [
        { id: 'ms-sfdc', label: 'Salesforce', pattern: 'service', icon: 'cloud', variant: 'tile' },
        { id: 'ms-workday', label: 'Workday', pattern: 'service', icon: 'cloud', variant: 'tile' },
        { id: 'ms-snow', label: 'ServiceNow', pattern: 'service', icon: 'cloud', variant: 'tile' },
        { id: 'ms-sqlserver', label: 'SQL Server', pattern: 'network', icon: 'database', variant: 'tile' },
        { id: 'ms-postgres', label: 'Postgres', pattern: 'network', icon: 'database', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 't-managed', target: 'managed-sources' }],
}
