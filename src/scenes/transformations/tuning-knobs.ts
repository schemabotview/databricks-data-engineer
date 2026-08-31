import type { Scene } from '../../render-engine'

// §10 tuning-knobs — the four keys the exam names verbatim, each carrying its default, because the
// default is what the question quotes. The closer is the classic question itself: 200 GB across 200
// partitions, tasks spilling — the answer is always "raise shuffle.partitions".
export const tuningKnobs: Scene = {
  id: 'tuning-knobs',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'knobs',
      label: 'The four knobs the exam names',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'k-shuffle',
          label: 'Shuffle partitions',
          pattern: 'service',
          icon: 'layers',
          sub: 'shuffle.partitions · 200',
        },
        {
          id: 'k-parallelism',
          label: 'RDD parallelism',
          pattern: 'network',
          icon: 'cpu',
          sub: 'default.parallelism · # cores',
        },
        {
          id: 'k-memory',
          label: 'executor / driver.memory',
          pattern: 'network',
          icon: 'memory',
          sub: 'heap per executor and driver',
        },
        {
          id: 'k-broadcast',
          label: 'Auto-broadcast',
          pattern: 'service',
          icon: 'copy',
          sub: 'the max size · 10 MB',
        },
      ],
    },
    {
      id: 'the-question',
      label: 'Tasks spilling?',
      pattern: 'warn',
      icon: 'gauge',
      sub: 'raise shuffle.partitions → 100–200 MB',
    },
    {
      id: 'balance',
      label: 'Both ways hurt',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-few', label: 'Too few → spill / OOM', pattern: 'warn', icon: 'ban', variant: 'tile' },
        { id: 'b-many', label: 'Too many → empty tasks', pattern: 'warn', icon: 'ban', variant: 'tile' },
      ],
    },
  ],
  edges: [
    { source: 'knobs', target: 'the-question' },
    { source: 'the-question', target: 'balance' },
  ],
}
