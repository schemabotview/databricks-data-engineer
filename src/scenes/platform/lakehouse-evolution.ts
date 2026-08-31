import type { Scene } from '../../render-engine'

// §1 lakehouse-evolution — why the two-system era ended. Two "before" systems side by side, each a
// container holding its WIN tile over its CATCH tile (`warn` red): the warehouse's rigid schema and
// closed storage, the lake's missing transactions and governance. Each catch is exactly what the
// lakehouse fixes, so the red tiles carry the argument. Below, the resolution: Delta Lake and Unity
// Catalog adding transactions + governance to the SAME cheap open files.
//
// Composition: scene flow TB — the two before-systems sit in one `before` container (LR, edgeless
// via cols:2) so they read as peers, and the crossing edge drops from that band into the lakehouse
// band. Folding the before-pair horizontally keeps the scene near the pane's aspect instead of a
// tall six-card column.
export const lakehouseEvolution: Scene = {
  id: 'lakehouse-evolution',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'before',
      label: 'Before — two systems, neither did the whole job',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'warehouse',
          label: 'Data warehouse',
          pattern: 'network',
          icon: 'database',
          sub: 'fast SQL · ACID · governance for BI',
          children: [
            {
              id: 'warehouse-catch',
              label: 'Rigid schema · closed',
              pattern: 'warn',
              sub: 'cost climbs at scale',
            },
          ],
        },
        {
          id: 'lake',
          label: 'Data lake',
          pattern: 'storage',
          icon: 'cloud',
          sub: 'cheap · open · any format',
          children: [
            {
              id: 'lake-catch',
              label: 'No ACID · no governance',
              pattern: 'warn',
              sub: 'rots into a swamp',
            },
          ],
        },
      ],
    },
    {
      id: 'lakehouse',
      label: 'The lakehouse — one open copy, both guarantees',
      pattern: 'group',
      // BT: cloud storage is the BASE and sits at the bottom; Delta and Unity Catalog are the layers
      // ADDED ON TOP of the same files, so the arrows climb out of storage into them. Matches the
      // §4 `platform-stack` convention — a foundation is built up, never drawn producing its layers.
      flow: 'BT',
      children: [
        {
          id: 'delta',
          label: 'Delta Lake',
          pattern: 'service',
          icon: 'layers',
          sub: 'transactions on the files',
        },
        {
          id: 'uc',
          label: 'Unity Catalog',
          pattern: 'user',
          icon: 'shieldcheck',
          sub: 'governs every asset',
        },
        {
          id: 'objstore',
          label: 'Cloud object storage',
          pattern: 'storage',
          icon: 'cloud',
          sub: 'the SAME files — cheap, open',
        },
      ],
      edges: [
        { source: 'objstore', target: 'delta' },
        { source: 'objstore', target: 'uc' },
      ],
    },
  ],
  // Container → container: it is the whole two-system ERA that gives way to the lakehouse, not the
  // warehouse turning into Delta Lake. Anchoring this on a leaf would name one ancestor and drop the
  // other — and the label is about running BOTH.
  edges: [{ source: 'before', target: 'lakehouse', label: 'run both → data drifts, split governance, double cost' }],
}
