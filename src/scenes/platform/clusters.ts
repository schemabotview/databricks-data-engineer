import type { Scene } from '../../render-engine'

// §6 clusters — anatomy first (a cluster IS a driver + workers), then the two kinds, then the rule of
// thumb as a `warn` card because running production on all-purpose is the classic anti-pattern the
// exam probes. The DBU rate sits in each kind's sub: it is the discriminator, not a footnote.
export const clusters: Scene = {
  id: 'clusters',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'anatomy',
      label: 'A cluster — cloud VMs running Spark',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'driver', label: 'Driver', pattern: 'service', icon: 'cpu', sub: 'coordinates the work' },
        { id: 'workers', label: 'Workers', pattern: 'network', icon: 'server', sub: 'do the parallel work' },
      ],
      edges: [{ source: 'driver', target: 'workers' }],
    },
    {
      id: 'kinds',
      label: 'Two kinds',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'all-purpose',
          label: 'All-purpose',
          pattern: 'network',
          icon: 'monitor',
          sub: 'interactive · shared · HIGHER rate',
        },
        {
          id: 'job-cluster',
          label: 'Job — ephemeral',
          pattern: 'service',
          icon: 'workflow',
          sub: 'one per run · LOWER rate',
        },
      ],
    },
    {
      id: 'rule',
      label: 'Rule of thumb',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'dev → all-purpose · prod → job',
    },
  ],
  edges: [
    { source: 'anatomy', target: 'kinds' },
    { source: 'kinds', target: 'rule' },
  ],
}
