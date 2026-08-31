import type { Scene } from '../../render-engine'

// §5 workspace — the sidebar tour, deliberately wrapped in the ACCOUNT boundary so the section's real
// payload lands visually: the Unity Catalog metastore lives at the ACCOUNT level, so governed data is
// shared across every workspace rather than trapped in one. The sibling "other workspaces" node is
// what makes that shape readable — without it the account box would look like decoration.
export const workspace: Scene = {
  id: 'workspace',
  padding: 0.16,
  nodes: [
    {
      id: 'account',
      label: 'Account — the UC metastore lives here',
      pattern: 'user',
      icon: 'shieldcheck',
      sub: 'one metastore, shared by every workspace',
      children: [
        {
          id: 'ws',
          label: 'Workspace — what you touch daily',
          pattern: 'service',
          icon: 'monitor',
          cols: 3,
          children: [
            { id: 'ws-notebooks', label: 'Notebooks', pattern: 'service', icon: 'code', variant: 'tile' },
            { id: 'ws-git', label: 'Git folders', pattern: 'service', icon: 'gitbranch', variant: 'tile' },
            { id: 'ws-catalog', label: 'Catalog Explorer', pattern: 'user', icon: 'database', variant: 'tile' },
            { id: 'ws-sql', label: 'SQL editor', pattern: 'service', icon: 'terminal', variant: 'tile' },
            { id: 'ws-jobs', label: 'Lakeflow Jobs', pattern: 'service', icon: 'workflow', variant: 'tile' },
            { id: 'ws-compute', label: 'Compute', pattern: 'network', icon: 'server', variant: 'tile' },
          ],
        },
        {
          id: 'other-ws',
          label: 'Other workspaces',
          pattern: 'external',
          icon: 'boxes',
          sub: 'same metastore, same governed data',
        },
      ],
    },
  ],
  edges: [],
}
