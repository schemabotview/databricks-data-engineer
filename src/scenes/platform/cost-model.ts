import type { Scene } from '../../render-engine'

// §9 cost-model — the bill split in two (DBUs to Databricks + VM cost to your cloud), then the two
// knobs that control it. The `warn` comparison card carries the exam's fact — job DBUs are cheaper
// than all-purpose — which is why §6's rule of thumb is cost advice, not just hygiene.
export const costModel: Scene = {
  id: 'cost-model',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'bill',
      label: 'The bill has two parts',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'dbus',
          label: 'DBUs',
          pattern: 'service',
          icon: 'gauge',
          sub: 'to Databricks · rate by workload + tier',
        },
        {
          id: 'vms',
          label: 'Cloud VM cost',
          pattern: 'network',
          icon: 'server',
          sub: 'to your provider · serverless bundles',
        },
      ],
    },
    {
      id: 'rates',
      label: 'Job rate < all-purpose',
      pattern: 'warn',
      icon: 'scale',
      sub: 'compute choice IS cost advice',
    },
    {
      id: 'knobs',
      label: 'Two knobs keep it down',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'autoscale',
          label: 'Autoscaling',
          pattern: 'service',
          icon: 'scale',
          sub: 'workers between min and max, by load',
        },
        {
          id: 'autoterm',
          label: 'Auto-termination',
          pattern: 'service',
          icon: 'clock',
          sub: 'idle shuts down · serverless → zero',
        },
      ],
    },
  ],
  edges: [
    { source: 'bill', target: 'rates' },
    { source: 'rates', target: 'knobs' },
  ],
}
