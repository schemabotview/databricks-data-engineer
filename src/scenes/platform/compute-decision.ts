import type { Scene } from '../../render-engine'

// §8 compute-decision — the cheat sheet the exam actually drills. Each card is a workload SHAPE in
// the label and the compute that fits in the sub, so the scene reads as a lookup table rather than a
// flow. Colour carries the answer: `network` = a cluster you manage, `service` = Databricks-managed.
//
// cols:2 rather than a single column: five 210-wide cards stacked ran ~240×590, a thin ribbon in a
// roughly square pane. Wrapped two-up it is ~490×420, close to the pane's own aspect, so fitView
// scales it up instead of leaving margins. Reading order (left→right, top→bottom) still walks the
// sheet in the order the narration says it.
export const computeDecision: Scene = {
  id: 'compute-decision',
  padding: 0.18,
  nodes: [
    {
      id: 'sheet',
      label: 'Match the SHAPE of the work to the compute',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'd-interactive',
          label: 'Interactive dev / ad-hoc',
          pattern: 'network',
          icon: 'monitor',
          sub: '→ All-purpose cluster',
        },
        {
          id: 'd-scheduled',
          label: 'Scheduled ETL',
          pattern: 'network',
          icon: 'workflow',
          sub: '→ Job cluster (cheaper rate)',
        },
        {
          id: 'd-bi',
          label: 'BI & ad-hoc SQL',
          pattern: 'service',
          icon: 'database',
          sub: '→ SQL warehouse (serverless)',
        },
        {
          id: 'd-bursty',
          label: 'Bursty / hands-off',
          pattern: 'service',
          icon: 'zap',
          sub: '→ Serverless, no idle cost',
        },
        {
          id: 'd-ml',
          label: 'ML training',
          pattern: 'user',
          icon: 'brain',
          sub: '→ Cluster on the ML runtime',
        },
      ],
    },
  ],
  edges: [],
}
