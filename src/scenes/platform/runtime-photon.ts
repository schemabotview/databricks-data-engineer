import type { Scene } from '../../render-engine'

// §10 runtime-photon — what every cluster boots (the DBR image and its variants), then Photon as a
// drop-in beneath it. Photon sits in its own band with a single edge in, because the section's point
// is that it REPLACES the execution engine without touching the code above it.
export const runtimePhoton: Scene = {
  id: 'runtime-photon',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'dbr',
      label: 'Databricks Runtime (DBR) — every cluster boots one',
      pattern: 'service',
      icon: 'boxes',
      sub: 'versioned (e.g. DBR 15.x) → reproducible environments',
      cols: 3,
      children: [
        { id: 'dbr-spark', label: 'Tuned Spark', pattern: 'service', icon: 'zap', variant: 'tile' },
        { id: 'dbr-delta', label: 'Delta Lake', pattern: 'storage', icon: 'layers', variant: 'tile' },
        { id: 'dbr-libs', label: 'Libraries + OS', pattern: 'external', icon: 'box', variant: 'tile' },
      ],
    },
    {
      id: 'variants',
      label: 'Pick the right one',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'lts',
          label: 'LTS release',
          pattern: 'network',
          icon: 'shieldcheck',
          sub: 'long-term support → production',
        },
        {
          id: 'ml-runtime',
          label: 'ML runtime',
          pattern: 'user',
          icon: 'brain',
          sub: 'ML libraries + GPU support',
        },
      ],
    },
    {
      id: 'photon',
      label: 'Photon — vectorized',
      pattern: 'service',
      icon: 'zap',
      sub: 'C++ drop-in for SQL & DataFrame',
    },
  ],
  edges: [
    { source: 'dbr', target: 'variants' },
    { source: 'dbr', target: 'photon', label: 'drop-in engine swap' },
  ],
}
