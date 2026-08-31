import type { Scene } from '../../render-engine'

// §1 cicd-problem — both pre-bundle options were bad in the SAME way (nothing said "this pipeline,
// plus this job, plus these notebooks, deployed as one unit"), so both wear `warn` and the fix band
// answers with the three things a bundle adds. The worked example runs through the whole course.
export const cicdProblem: Scene = {
  id: 'cicd-problem',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'before',
      label: 'Before bundles — two bad options',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'p-clicks',
          label: 'Point & click',
          pattern: 'warn',
          icon: 'monitor',
          sub: 'clone by hand → prod DRIFTS from dev',
        },
        {
          id: 'p-scripts',
          label: 'REST API scripts',
          pattern: 'warn',
          icon: 'terminal',
          sub: 'every team reinvents the plumbing',
        },
      ],
    },
    {
      id: 'bundles',
      label: 'Automation Bundles fix it',
      pattern: 'service',
      icon: 'boxes',
      sub: 'one unit: this pipeline + this job + these notebooks',
      cols: 3,
      children: [
        { id: 'b-manifest', label: 'One databricks.yml', pattern: 'service', icon: 'filecode', variant: 'tile' },
        { id: 'b-cli', label: 'A CLI', pattern: 'service', icon: 'terminal', variant: 'tile' },
        { id: 'b-targets', label: 'One flag per target', pattern: 'service', icon: 'gitbranch', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'before', target: 'bundles' }],
}
