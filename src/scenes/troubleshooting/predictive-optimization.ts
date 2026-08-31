import type { Scene } from '../../render-engine'

// §8 predictive-optimization — two features, one goal: a healthy Delta table with no hand-written
// maintenance job. The `warn` note is the constraint the exam tests — Predictive Optimization is
// UC MANAGED tables only, which is one more reason course 2's "prefer managed" default holds.
export const predictiveOptimization: Scene = {
  id: 'predictive-optimization',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'no-job',
      label: 'Healthy tables, with no hand-written maintenance job',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'po-liquid',
          label: 'Liquid Clustering',
          pattern: 'network',
          icon: 'layers',
          sub: 'an evolvable layout — change keys later',
          cols: 3,
          children: [
            { id: 'lq-small', label: 'No small files', pattern: 'network', icon: 'circlecheck', variant: 'tile' },
            { id: 'lq-skew', label: 'Rebalances skew', pattern: 'network', icon: 'scale', variant: 'tile' },
            { id: 'lq-keys', label: 'Evolvable keys', pattern: 'network', icon: 'gitbranch', variant: 'tile' },
          ],
        },
        {
          id: 'po-predictive',
          label: 'Predictive Optimization',
          pattern: 'service',
          icon: 'brain',
          sub: 'Databricks runs it, on your access patterns',
          cols: 2,
          children: [
            { id: 'pr-optimize', label: 'OPTIMIZE', pattern: 'service', icon: 'boxes', variant: 'tile' },
            { id: 'pr-vacuum', label: 'VACUUM', pattern: 'service', icon: 'ban', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'po-constraint',
      label: 'UC MANAGED tables only',
      pattern: 'warn',
      icon: 'shieldcheck',
      sub: 'external tables get neither',
    },
  ],
  edges: [{ source: 'no-job', target: 'po-constraint' }],
}
