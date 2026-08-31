import type { Scene } from '../../render-engine'

// §7 liquid-clustering — the one-time bet you used to be locked into, then the single evolvable
// property that replaces BOTH partitioning and ZORDER. The closing card carries the exam line
// verbatim, because "recommended layout for new Delta tables" is the answer a question wants.
export const liquidClustering: Scene = {
  id: 'liquid-clustering',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'partitioning',
      label: 'Partitioning — a one-time bet',
      pattern: 'group',
      sub: 're-partitioning a TB-scale table is a full rewrite',
      cols: 2,
      children: [
        {
          id: 'over-part',
          label: 'Over-partitioning',
          pattern: 'warn',
          icon: 'ban',
          sub: 'small files per partition + skew',
        },
        {
          id: 'locked-keys',
          label: 'Keys locked in',
          pattern: 'warn',
          icon: 'lock',
          sub: 'chosen at create time, for good',
        },
      ],
    },
    {
      id: 'liquid',
      label: 'CLUSTER BY (cols) — replaces partitioning AND ZORDER',
      pattern: 'service',
      icon: 'layers',
      cols: 3,
      children: [
        { id: 'l-rebalance', label: 'Rebalances', pattern: 'service', icon: 'repeat', variant: 'tile' },
        { id: 'l-evolve', label: 'Change keys later', pattern: 'service', icon: 'gitbranch', variant: 'tile' },
        { id: 'l-nosmall', label: 'No small files', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
      ],
    },
    {
      id: 'lc-exam',
      label: 'Exam',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'the recommended layout for NEW tables',
    },
  ],
  edges: [
    { source: 'partitioning', target: 'liquid' },
    { source: 'liquid', target: 'lc-exam' },
  ],
}
