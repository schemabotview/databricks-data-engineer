import type { Scene } from '../../render-engine'

// §9 bundle-scope — in vs. out, and the closing band gives the REASON, which is what makes the
// boundary memorable rather than a list: bundles and IaC have different lifecycles and blast radii.
// You redeploy a bundle many times a day; you create a catalog once, behind its own approval.
export const bundleScope: Scene = {
  id: 'bundle-scope',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'inout',
      label: 'A bundle is for WORKSPACE-SHAPED CODE',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'in',
          label: 'In the bundle',
          pattern: 'service',
          icon: 'circlecheck',
          cols: 2,
          children: [
            { id: 'i-jobs', label: 'Jobs', pattern: 'service', icon: 'workflow', variant: 'tile' },
            { id: 'i-pipes', label: 'Pipelines', pattern: 'service', icon: 'waves', variant: 'tile' },
            { id: 'i-nb', label: 'Notebooks', pattern: 'service', icon: 'code', variant: 'tile' },
            { id: 'i-wheels', label: 'Wheels', pattern: 'service', icon: 'box', variant: 'tile' },
            { id: 'i-models', label: 'ML models', pattern: 'service', icon: 'brain', variant: 'tile' },
            { id: 'i-dash', label: 'Dashboards', pattern: 'service', icon: 'monitor', variant: 'tile' },
          ],
        },
        {
          id: 'out',
          label: 'Out of the bundle',
          pattern: 'warn',
          icon: 'ban',
          cols: 2,
          children: [
            { id: 'o-data', label: 'Raw data', pattern: 'warn', icon: 'database', variant: 'tile' },
            { id: 'o-catalogs', label: 'UC catalogs', pattern: 'warn', icon: 'shieldcheck', variant: 'tile' },
            { id: 'o-sps', label: 'Principals', pattern: 'warn', icon: 'key', variant: 'tile' },
            { id: 'o-secrets', label: 'Secret VALUES', pattern: 'warn', icon: 'lock', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'lifecycles',
      label: 'Why — different lifecycles',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lc-bundle', label: 'Deploy a bundle daily', pattern: 'service', icon: 'repeat', sub: 'small blast radius' },
        { id: 'lc-infra', label: 'Create a catalog once', pattern: 'user', icon: 'shieldcheck', sub: 'its own approval path' },
      ],
    },
  ],
  edges: [{ source: 'inout', target: 'lifecycles' }],
}
