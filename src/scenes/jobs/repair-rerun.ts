import type { Scene } from '../../render-engine'

// §9 repair-rerun — the two UI views answer different questions, which is the section's point: run
// history shows a TREND over runs, the task graph shows the BLOCKER within one run. The repair band
// closes with the arithmetic that makes it obvious — reuse five good tasks instead of redoing six hours.
export const repairRerun: Scene = {
  id: 'repair-rerun',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'views',
      label: 'The Jobs UI — two views, two questions',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'v-history',
          label: 'Run history',
          pattern: 'network',
          icon: 'gauge',
          sub: 'every run + a duration sparkline → TRENDS',
        },
        {
          id: 'v-graph',
          label: 'Task graph',
          pattern: 'service',
          icon: 'workflow',
          sub: 'one run’s DAG by state → the BLOCKER',
        },
      ],
    },
    {
      id: 'states',
      label: 'Read the graph by colour',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'st-failed', label: 'failed', pattern: 'warn', icon: 'ban', variant: 'tile' },
        { id: 'st-skipped', label: 'skipped', pattern: 'external', icon: 'circleslash', variant: 'tile' },
        { id: 'st-ok', label: 'succeeded', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
      ],
    },
    {
      id: 'repair',
      label: 'Repair run',
      pattern: 'service',
      icon: 'wrench',
      sub: 'rerun ONLY the failed tasks, same DAG',
    },
  ],
  edges: [
    { source: 'views', target: 'states' },
    { source: 'states', target: 'repair' },
  ],
}
