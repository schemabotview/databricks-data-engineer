import type { Scene } from '../../render-engine'

// §8 pipeline-modes — the section exists because these two axes get confused, so the scene's whole
// job is to hold them APART: two side-by-side bands, each with its own pair, and a `warn` closer
// naming the confusion outright. Cadence is about the DATA; lifecycle is about the CLUSTER.
export const pipelineModes: Scene = {
  id: 'pipeline-modes',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'axes',
      label: 'Two INDEPENDENT axes',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'cadence',
          label: 'Data cadence',
          pattern: 'network',
          icon: 'clock',
          sub: 'how the pipeline runs',
          children: [
            { id: 'c-triggered', label: 'Triggered', pattern: 'network', icon: 'circlecheck', sub: 'run once, stop · cheaper' },
            { id: 'c-continuous', label: 'Continuous', pattern: 'network', icon: 'repeat', sub: 'forever · lower latency' },
          ],
        },
        {
          id: 'lifecycle',
          label: 'Cluster lifecycle',
          pattern: 'service',
          icon: 'server',
          sub: 'how the cluster behaves',
          children: [
            { id: 'l-dev', label: 'Development', pattern: 'service', icon: 'code', sub: 'stays alive · fast iteration' },
            { id: 'l-prod', label: 'Production', pattern: 'service', icon: 'shieldcheck', sub: 'terminates · errors fail' },
          ],
        },
      ],
    },
    {
      id: 'more-settings',
      label: 'Two more settings',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-channel', label: 'Channel', pattern: 'external', icon: 'gitbranch', sub: 'Current (GA) or Preview' },
        { id: 's-target', label: 'Target catalog', pattern: 'user', icon: 'shieldcheck', sub: 'else visible only to the pipeline' },
      ],
    },
    {
      id: 'dont-mix',
      label: 'Don’t mix the two',
      pattern: 'warn',
      icon: 'ban',
      sub: 'cadence ≠ lifecycle — they are independent',
    },
  ],
  edges: [
    { source: 'axes', target: 'more-settings' },
    { source: 'more-settings', target: 'dont-mix' },
  ],
}
