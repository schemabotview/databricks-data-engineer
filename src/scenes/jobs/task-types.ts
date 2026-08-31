import type { Scene } from '../../render-engine'

// §3 task-types — for each of the four, the exam wants two facts: what it runs and WHERE it runs. So
// the compute target is the sub on every card, since that is the discriminator (a dashboard needs a
// SQL warehouse; a pipeline manages its own compute and you must not attach a cluster to it).
export const taskTypes: Scene = {
  id: 'task-types',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'four',
      label: 'The four the exam names — match the artifact to the task',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'tt-notebook', label: 'Notebook', pattern: 'service', icon: 'code', sub: 'an .ipynb → a cluster' },
        { id: 'tt-sql', label: 'SQL', pattern: 'network', icon: 'terminal', sub: 'query/alert/file → SQL wh' },
        { id: 'tt-pipeline', label: 'Pipeline', pattern: 'service', icon: 'waves', sub: 'ex-DLT → self-managed' },
        { id: 'tt-dashboard', label: 'Dashboard', pattern: 'user', icon: 'monitor', sub: 'AI/BI → SQL warehouse' },
      ],
    },
    {
      id: 'secondary',
      label: 'Recognise these too',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 's-jar', label: 'JAR / wheel', pattern: 'external', icon: 'box', variant: 'tile' },
        { id: 's-dbt', label: 'dbt', pattern: 'external', icon: 'gears', variant: 'tile' },
        { id: 's-runjob', label: 'Run job', pattern: 'external', icon: 'workflow', variant: 'tile' },
        { id: 's-foreach', label: 'for_each', pattern: 'external', icon: 'repeat', variant: 'tile' },
        { id: 's-ifelse', label: 'if / else', pattern: 'external', icon: 'gitbranch', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'four', target: 'secondary' }],
}
