import type { Scene } from '../../render-engine'

// §5 shuffle — the narration ends on a three-verb model (avoid · shrink · balance), which is a better
// spine than a flat remedy list because it says WHY each remedy works. Each verb holds its own
// techniques as tiles, so the band has width and the model is countable.
export const shuffle: Scene = {
  id: 'shuffle',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'sh-symptom',
      label: 'Network-bound',
      pattern: 'warn',
      icon: 'network',
      sub: 'shuffle read/write dominates the stage',
    },
    {
      id: 'model',
      label: 'You can rarely remove a shuffle — but you can shrink and balance it',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'sh-avoid',
          label: 'Avoid',
          pattern: 'service',
          icon: 'copy',
          sub: 'broadcast, if a side fits',
        },
        {
          id: 'sh-shrink',
          label: 'Shrink',
          pattern: 'network',
          icon: 'funnel',
          sub: 'filter and project EARLY',
        },
        {
          id: 'sh-balance',
          label: 'Balance',
          pattern: 'service',
          icon: 'scale',
          sub: 'right-size partitions + AQE',
        },
      ],
    },
    {
      id: 'sizing',
      label: 'Right-sizing, concretely',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sz-bad', label: '1 TB / 200 = 5 GB each', pattern: 'warn', icon: 'ban', sub: 'far too big — it spills' },
        { id: 'sz-good', label: '1 TB / 4000 = 250 MB', pattern: 'service', icon: 'circlecheck', sub: 'the sweet spot' },
      ],
    },
    {
      id: 'double',
      label: 'No needless repartition',
      pattern: 'warn',
      icon: 'repeat',
      sub: 'before a join = 2 shuffles',
    },
  ],
  edges: [
    { source: 'sh-symptom', target: 'model' },
    { source: 'model', target: 'sizing' },
    { source: 'sizing', target: 'double' },
  ],
}
