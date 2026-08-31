import type { Scene } from '../../render-engine'

// §1 diagnostic-flow — the sequence, folded by WHICH UI YOU ARE IN rather than run as one five-card
// chain (which would be ~1270 wide). The fold names the real boundary: you localise in the Jobs UI,
// then drop into the Spark UI. The `warn` closer is the discipline — never start by resizing.
export const diagnosticFlow: Scene = {
  id: 'diagnostic-flow',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'jobs-ui',
      label: 'In the Jobs UI — localise the task',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'df-history', label: '1 · Run history', pattern: 'network', icon: 'gauge', sub: 'this run, or all of them?' },
        { id: 'df-graph', label: '2 · Task graph', pattern: 'network', icon: 'workflow', sub: 'which task — or its upstream?' },
      ],
      edges: [{ source: 'df-history', target: 'df-graph' }],
    },
    {
      id: 'spark-ui-band',
      label: 'In the Spark UI — localise the stage',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'df-stages', label: '3 · Stages', pattern: 'service', icon: 'layers', sub: 'which stage is slow?' },
        { id: 'df-detail', label: '4 · Stage detail', pattern: 'service', icon: 'gauge', sub: 'min / median / max · spill · GC' },
      ],
      edges: [{ source: 'df-stages', target: 'df-detail' }],
    },
    {
      id: 'df-fix',
      label: '5 · Match → remedy',
      pattern: 'warn',
      icon: 'wrench',
      sub: 'never resize first',
    },
  ],
  edges: [
    { source: 'jobs-ui', target: 'spark-ui-band' },
    { source: 'spark-ui-band', target: 'df-fix' },
  ],
}
