import type { Scene } from '../../render-engine'

// §1 bronze-to-silver — the module's spine, and the exam's heaviest topic. The six transforms sit in
// their own band as tiles so "what actually changes" is countable; the `warn` closer carries the line
// students get wrong most often — silver does NOT pre-aggregate, it stays at one event per row.
export const bronzeToSilver: Scene = {
  id: 'bronze-to-silver',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'bronze',
      label: 'Bronze — raw',
      pattern: 'external',
      icon: 'database',
      sub: 'append-only · STRING on purpose',
    },
    {
      id: 'transforms',
      label: 'Six things the transform does',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-nulls', label: 'Drop nulls', pattern: 'network', icon: 'ban', variant: 'tile' },
        { id: 't-cast', label: 'Cast types', pattern: 'network', icon: 'braces', variant: 'tile' },
        { id: 't-normalise', label: 'Normalise', pattern: 'network', icon: 'wrench', variant: 'tile' },
        { id: 't-dedup', label: 'Deduplicate', pattern: 'network', icon: 'copy', variant: 'tile' },
        { id: 't-flatten', label: 'Flatten structs', pattern: 'network', icon: 'layers', variant: 'tile' },
        { id: 't-join', label: 'Join dimensions', pattern: 'network', icon: 'network', variant: 'tile' },
      ],
    },
    {
      id: 'silver',
      label: 'Silver — conformed',
      pattern: 'service',
      icon: 'database',
      sub: 'stable · one event per row',
    },
    {
      id: 'not-gold',
      label: 'No pre-aggregation',
      pattern: 'warn',
      icon: 'ban',
      sub: 'rollups are gold’s job',
    },
  ],
  edges: [
    { source: 'bronze', target: 'transforms' },
    { source: 'transforms', target: 'silver' },
    { source: 'silver', target: 'not-gold' },
  ],
}
