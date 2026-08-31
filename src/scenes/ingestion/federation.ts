import type { Scene } from '../../render-engine'

// §10 federation — the row the exam loves to plant in wrong answers, so the scene is built as a
// two-sided judgement rather than a feature list: the mechanism on top, then when it is right against
// when it is not. Reading the two bands side by side is the whole section.
export const federation: Scene = {
  id: 'federation',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'mechanism',
      label: 'Sometimes the answer is: DON’T ingest',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'foreign',
          label: 'Foreign database',
          pattern: 'external',
          icon: 'database',
          sub: 'Postgres · Snowflake · Redshift',
        },
        {
          id: 'uc-catalog',
          label: 'A UC catalog',
          pattern: 'user',
          icon: 'shieldcheck',
          sub: 'queried in place — no pipeline',
        },
      ],
      edges: [{ source: 'foreign', target: 'uc-catalog', label: 'registered as' }],
    },
    {
      id: 'judgement',
      label: 'The judgement',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'use-when',
          label: 'Use it when',
          pattern: 'service',
          icon: 'circlecheck',
          cols: 1,
          children: [
            { id: 'u-small', label: 'Small or rare', pattern: 'service', icon: 'file', variant: 'tile' },
            { id: 'u-current', label: 'Need current row', pattern: 'service', icon: 'clock', variant: 'tile' },
            { id: 'u-nocopy', label: 'Copying forbidden', pattern: 'service', icon: 'lock', variant: 'tile' },
          ],
        },
        {
          id: 'dont-when',
          label: 'Don’t when',
          pattern: 'warn',
          icon: 'ban',
          cols: 1,
          children: [
            { id: 'd-hot', label: 'Queried daily', pattern: 'warn', icon: 'zap', variant: 'tile' },
            { id: 'd-joins', label: 'Cross-source joins', pattern: 'warn', icon: 'network', variant: 'tile' },
            { id: 'd-history', label: 'Need time travel', pattern: 'warn', icon: 'clock', variant: 'tile' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'mechanism', target: 'judgement' }],
}
