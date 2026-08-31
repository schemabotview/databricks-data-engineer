import type { Scene } from '../../render-engine'

// §1 security-hierarchy — drawn as actual NESTING rather than a four-card chain, because the
// section's claim is that UC permissions are a strict TREE and a grant flows down to everything
// inside. Containment says that; a chain of arrows would only say "next". The `warn` closer is the
// single most common trap on the exam: SELECT without both gating privileges does nothing.
export const securityHierarchy: Scene = {
  id: 'security-hierarchy',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'metastore',
      label: 'metastore — grants inherit DOWNWARD',
      pattern: 'user',
      icon: 'shieldcheck',
      children: [
        {
          id: 'catalog',
          label: 'catalog — a GRANT here reaches every schema',
          pattern: 'user',
          icon: 'boxes',
          children: [
            {
              id: 'schema',
              label: 'schema — and every table inside it',
              pattern: 'network',
              icon: 'layers',
              cols: 5,
              children: [
                { id: 'ob-table', label: 'table', pattern: 'service', icon: 'table', variant: 'tile' },
                { id: 'ob-view', label: 'view', pattern: 'service', icon: 'funnel', variant: 'tile' },
                { id: 'ob-volume', label: 'volume', pattern: 'storage', icon: 'boxes', variant: 'tile' },
                { id: 'ob-function', label: 'function', pattern: 'network', icon: 'braces', variant: 'tile' },
                { id: 'ob-model', label: 'model', pattern: 'user', icon: 'brain', variant: 'tile' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'gating',
      label: 'Two gating privileges — needed at every level above an object',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'g-catalog', label: 'USE CATALOG', pattern: 'warn', icon: 'key', sub: 'else you see no schemas' },
        { id: 'g-schema', label: 'USE SCHEMA', pattern: 'warn', icon: 'key', sub: 'else you see no tables' },
      ],
    },
    {
      id: 'trap',
      label: 'The #1 exam trap',
      pattern: 'warn',
      icon: 'ban',
      sub: 'SELECT alone is useless without both',
    },
  ],
  edges: [
    { source: 'metastore', target: 'gating' },
    { source: 'gating', target: 'trap' },
  ],
}
