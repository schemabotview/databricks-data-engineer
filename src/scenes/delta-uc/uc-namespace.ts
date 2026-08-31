import type { Scene } from '../../render-engine'

// §8 uc-namespace — the metastore sits ABOVE the name, not inside it: `catalog.schema.object` is the
// three-part name, and the metastore is the regional container that holds it. Drawn as one flat
// four-card chain this read ~1016 wide against ~540 tall (a 1.9 ribbon, so fitView fit the width and
// left dead space top and bottom) AND it blurred that distinction. Splitting them fixes both.
export const ucNamespace: Scene = {
  id: 'uc-namespace',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'n-metastore',
      label: 'Metastore',
      pattern: 'user',
      icon: 'shieldcheck',
      sub: 'one per region · shared by every workspace',
    },
    {
      id: 'namespace',
      label: 'catalog.schema.object — the three-part name',
      pattern: 'group',
      sub: 'permissions flow DOWN the levels',
      flow: 'LR',
      children: [
        { id: 'n-catalog', label: 'Catalog', pattern: 'user', icon: 'boxes', sub: 'e.g. fintech_dev' },
        { id: 'n-schema', label: 'Schema', pattern: 'network', icon: 'layers', sub: 'bronze · silver · gold' },
        { id: 'n-object', label: 'Object', pattern: 'service', icon: 'database', sub: 'the securable itself' },
      ],
      edges: [
        { source: 'n-catalog', target: 'n-schema' },
        { source: 'n-schema', target: 'n-object' },
      ],
    },
    {
      id: 'securables',
      label: 'Six securables',
      pattern: 'group',
      cols: 6,
      children: [
        { id: 'sec-tables', label: 'Tables', pattern: 'service', icon: 'database', variant: 'tile' },
        { id: 'sec-views', label: 'Views', pattern: 'service', icon: 'monitor', variant: 'tile' },
        { id: 'sec-volumes', label: 'Volumes', pattern: 'storage', icon: 'boxes', variant: 'tile' },
        { id: 'sec-functions', label: 'Functions', pattern: 'network', icon: 'braces', variant: 'tile' },
        { id: 'sec-models', label: 'Models', pattern: 'user', icon: 'brain', variant: 'tile' },
        { id: 'sec-mvs', label: 'Mat. views', pattern: 'service', icon: 'layers', variant: 'tile' },
      ],
    },
    {
      id: 'legacy',
      label: 'Legacy hive_metastore',
      pattern: 'warn',
      icon: 'ban',
      sub: 'per-workspace · never for new tables',
    },
  ],
  edges: [
    { source: 'n-metastore', target: 'namespace' },
    { source: 'namespace', target: 'securables' },
    { source: 'securables', target: 'legacy' },
  ],
}
