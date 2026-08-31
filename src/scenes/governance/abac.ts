import type { Scene } from '../../render-engine'

// §6 abac — the section exists because per-table masks and filters DON'T SCALE, so the scene leads
// with the three building blocks as a pipeline and closes on the payoff that makes it scale: a new
// tagged column is already covered, with nothing to remember per table.
export const abac: Scene = {
  id: 'abac',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'blocks',
      label: 'Define a policy ONCE, apply it by TAG',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'ab-tags',
          label: 'Tags',
          pattern: 'user',
          icon: 'tag',
          sub: 'on catalog, schema, table or column',
        },
        {
          id: 'ab-policies',
          label: 'Policies',
          pattern: 'service',
          icon: 'shieldcheck',
          sub: 'one central rule per tag',
        },
        {
          id: 'ab-eval',
          label: 'Evaluation',
          pattern: 'network',
          icon: 'gears',
          sub: 'at query time, ON TOP OF grants',
        },
      ],
      edges: [
        { source: 'ab-tags', target: 'ab-policies' },
        { source: 'ab-policies', target: 'ab-eval' },
      ],
    },
    {
      id: 'scales',
      label: 'Why it scales',
      pattern: 'service',
      icon: 'circlecheck',
      sub: 'a NEW tagged column is already covered',
    },
    {
      id: 'ab-vs',
      label: 'Per-table vs. ABAC',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ab-manual', label: 'Per-table masks', pattern: 'warn', icon: 'wrench', sub: 'the manual answer' },
        { id: 'ab-scale', label: '“across 100s of tables”', pattern: 'service', icon: 'boxes', sub: 'the ABAC tell' },
      ],
    },
  ],
  edges: [
    { source: 'blocks', target: 'scales' },
    { source: 'scales', target: 'ab-vs' },
  ],
}
