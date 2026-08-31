import type { Scene } from '../../render-engine'

// §1 job-anatomy — the vocabulary, and getting it right makes the rest of the course fall into place.
// Task is drawn INSIDE Job because that nesting is the relationship; Run sits beside them as the
// execution, not a third layer of the same stack.
export const jobAnatomy: Scene = {
  id: 'job-anatomy',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'job',
      label: 'Job — what to run, and when',
      pattern: 'service',
      icon: 'workflow',
      sub: 'the unit of orchestration · named and version-controlled',
      children: [
        {
          id: 'task',
          label: 'Task — one step',
          pattern: 'network',
          icon: 'box',
          sub: 'a job is one task, or many wired into a DAG',
          cols: 4,
          children: [
            { id: 'ta-nb', label: 'Notebook', pattern: 'network', icon: 'code', variant: 'tile' },
            { id: 'ta-sql', label: 'SQL', pattern: 'network', icon: 'terminal', variant: 'tile' },
            { id: 'ta-pipe', label: 'Pipeline', pattern: 'network', icon: 'waves', variant: 'tile' },
            { id: 'ta-dash', label: 'Dashboard', pattern: 'network', icon: 'monitor', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'run',
      label: 'Run — one execution',
      pattern: 'user',
      icon: 'repeat',
      sub: 'pending → running → succeeded / failed / cancelled',
    },
    {
      id: 'rename',
      label: 'Rename watch',
      pattern: 'warn',
      icon: 'tag',
      sub: 'Lakeflow Jobs = Workflows = Jobs',
    },
  ],
  edges: [
    { source: 'job', target: 'run' },
    { source: 'run', target: 'rename' },
  ],
}
