import type { Scene } from '../../render-engine'

// §6 disk-spill — the "why it hurts" band is drawn as the actual round trip, because that sequence is
// the reason spill costs orders of magnitude. The `warn` closer carries the classic trap: the
// direction is MORE partitions. The instinct to consolidate into fewer tasks is exactly backwards.
export const diskSpill: Scene = {
  id: 'disk-spill',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'sp-symptom',
      label: 'Spill > 0',
      pattern: 'warn',
      icon: 'memory',
      sub: 'written to disk — it missed RAM',
    },
    {
      id: 'roundtrip',
      label: 'Why it hurts — the round trip',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'rt-write', label: 'Write to disk', pattern: 'warn', icon: 'ban', sub: 'out of memory' },
        { id: 'rt-read', label: 'Read back', pattern: 'warn', icon: 'repeat', sub: 'and de-serialise' },
        { id: 'rt-rejoin', label: 'Rejoin', pattern: 'warn', icon: 'network', sub: 'orders of magnitude slower' },
      ],
      edges: [
        { source: 'rt-write', target: 'rt-read' },
        { source: 'rt-read', target: 'rt-rejoin' },
      ],
    },
    {
      id: 'sp-remedies',
      label: 'Remedies, in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sp-parts', label: 'Raise partitions', pattern: 'service', icon: 'layers', sub: 'shuffle.partitions — cleanest' },
        { id: 'sp-mem', label: 'Raise memory', pattern: 'network', icon: 'memory', sub: 'fewer executors per node' },
        { id: 'sp-early', label: 'Filter earlier', pattern: 'network', icon: 'funnel', sub: 'shrink the payload' },
        { id: 'sp-aqe', label: 'Enable AQE', pattern: 'service', icon: 'zap', sub: 'coalesce at runtime' },
      ],
    },
    {
      id: 'sp-direction',
      label: 'Direction is MORE',
      pattern: 'warn',
      icon: 'scale',
      sub: 'fewer = bigger = worse spill',
    },
  ],
  edges: [
    { source: 'sp-symptom', target: 'roundtrip' },
    { source: 'roundtrip', target: 'sp-remedies' },
    { source: 'sp-remedies', target: 'sp-direction' },
  ],
}
