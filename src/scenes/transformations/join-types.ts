import type { Scene } from '../../render-engine'

// §4 join-types — the seven, grouped by WHAT THEY DO rather than listed flat. Seven 210-wide cards in
// a row would be the thin-ribbon shape, and the families are the real teaching: the two Spark-specific
// filters (semi/anti) are a different KIND of thing from the outer joins, which a flat list hides.
export const joinTypes: Scene = {
  id: 'join-types',
  padding: 0.14,
  nodes: [
    {
      id: 'families',
      label: 'Seven join types, three families',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'f-matching',
          label: 'Matching',
          pattern: 'service',
          icon: 'circlecheck',
          sub: 'the key matches on both sides',
          children: [{ id: 'j-inner', label: 'inner', pattern: 'service', icon: 'network', variant: 'tile' }],
        },
        {
          id: 'f-outer',
          label: 'Outer — keep the unmatched',
          pattern: 'network',
          icon: 'layers',
          sub: 'nulls on the missing side',
          cols: 3,
          children: [
            { id: 'j-left', label: 'left', pattern: 'network', icon: 'network', variant: 'tile' },
            { id: 'j-right', label: 'right', pattern: 'network', icon: 'network', variant: 'tile' },
            { id: 'j-full', label: 'full', pattern: 'network', icon: 'network', variant: 'tile' },
          ],
        },
        {
          id: 'f-filters',
          label: 'Filters — LEFT columns only',
          pattern: 'user',
          icon: 'funnel',
          sub: 'brings back nothing from the right',
          cols: 2,
          children: [
            { id: 'j-semi', label: 'left_semi', pattern: 'user', icon: 'circlecheck', variant: 'tile' },
            { id: 'j-anti', label: 'left_anti', pattern: 'user', icon: 'circleslash', variant: 'tile' },
          ],
        },
        {
          id: 'f-cross',
          label: 'Cartesian',
          pattern: 'warn',
          icon: 'ban',
          sub: 'rarely what you want',
          children: [{ id: 'j-cross', label: 'cross', pattern: 'warn', icon: 'network', variant: 'tile' }],
        },
      ],
    },
  ],
  edges: [],
}
