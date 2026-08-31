import type { Scene } from '../../render-engine'

// §6 job-compute — the fact people miss is that compute is a PER-TASK choice, so the scene leads with
// the four options side by side and closes on cluster reuse (pay the startup once). All-purpose wears
// `warn`: using it for a scheduled job is both the wrong exam answer and the pricier one.
export const jobCompute: Scene = {
  id: 'job-compute',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'options',
      label: 'Tasks in ONE job can use DIFFERENT compute',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'jc-job',
          label: 'Job cluster',
          pattern: 'service',
          icon: 'server',
          sub: 'per task, torn down · CHEAPEST rate',
        },
        {
          id: 'jc-serverless',
          label: 'Serverless jobs',
          pattern: 'service',
          icon: 'zap',
          sub: 'starts in seconds · short tasks',
        },
        {
          id: 'jc-allpurpose',
          label: 'All-purpose',
          pattern: 'warn',
          icon: 'monitor',
          sub: 'AVOID for scheduled jobs',
        },
        {
          id: 'jc-warehouse',
          label: 'SQL warehouse',
          pattern: 'network',
          icon: 'database',
          sub: 'REQUIRED for SQL & Dashboard',
        },
      ],
    },
    {
      id: 'reuse',
      label: 'Cluster reuse',
      pattern: 'service',
      icon: 'repeat',
      sub: 'share one across tasks → pay startup once',
    },
  ],
  edges: [{ source: 'options', target: 'reuse' }],
}
