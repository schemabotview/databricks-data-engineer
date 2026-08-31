import type { Scene } from '../../render-engine'

// §3 two-planes — the split the exam leans on: where your CODE runs vs. where your DATA lives. The
// control plane (Databricks' account) holds management services and metadata only; the compute plane
// holds the clusters, in two flavours whose difference is WHOSE account they run in; and the data at
// rest never sits in either — it stays in the customer's own object storage.
//
// Composition: scene flow TB, three bands. The two compute flavours are a cols:2 pair inside the
// compute band, and BOTH drop to the storage node, so the "wherever you compute, the data stays put"
// point is drawn rather than stated.
export const twoPlanes: Scene = {
  id: 'two-planes',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'control-plane',
      label: 'Control plane — Databricks’ account',
      pattern: 'service',
      icon: 'monitor',
      sub: 'holds metadata + query results — never your bulk data',
      cols: 3,
      children: [
        { id: 'cp-ui', label: 'Web UI', pattern: 'service', icon: 'monitor', variant: 'tile' },
        { id: 'cp-editors', label: 'Notebook & SQL editors', pattern: 'service', icon: 'code', variant: 'tile' },
        { id: 'cp-scheduler', label: 'Job scheduler', pattern: 'service', icon: 'clock', variant: 'tile' },
        { id: 'cp-clustermgr', label: 'Cluster manager', pattern: 'service', icon: 'server', variant: 'tile' },
        { id: 'cp-ucmeta', label: 'Unity Catalog metadata', pattern: 'user', icon: 'shieldcheck', variant: 'tile' },
        { id: 'cp-history', label: 'Query history', pattern: 'service', icon: 'scroll', variant: 'tile' },
      ],
    },
    {
      id: 'compute-plane',
      label: 'Compute plane — where data is processed',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'classic',
          label: 'Classic',
          pattern: 'network',
          icon: 'server',
          sub: 'YOUR cloud account — data stays put',
        },
        {
          id: 'serverless',
          label: 'Serverless',
          pattern: 'network',
          icon: 'zap',
          sub: 'Databricks’ account — ready instantly',
        },
      ],
    },
    {
      id: 'storage',
      label: 'YOUR object storage',
      pattern: 'storage',
      icon: 'cloud',
      sub: 'data AT REST always stays here',
    },
  ],
  edges: [
    { source: 'control-plane', target: 'compute-plane', label: 'launches · governs' },
    { source: 'classic', target: 'storage', label: 'read / write' },
    { source: 'serverless', target: 'storage', label: 'read / write' },
  ],
}
