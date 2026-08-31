import type { Scene } from '../../render-engine'

// §6 ingestion-compare — you don't pick on correctness (both are idempotent), you pick on operational
// shape. Each side carries its own idempotency mechanism and its best fit as tiles, so the comparison
// is read across rather than down. The closer is the single most common exam question pattern.
export const ingestionCompare: Scene = {
  id: 'ingestion-compare',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      label: 'Both load files into Delta · both idempotent',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'copy-into',
          label: 'COPY INTO',
          pattern: 'network',
          icon: 'terminal',
          sub: 'pure SQL, no streaming machinery',
          cols: 2,
          children: [
            { id: 'ci-idem', label: 'Delta load history', pattern: 'network', icon: 'scroll', variant: 'tile' },
            { id: 'ci-fit', label: 'Daily batch', pattern: 'network', icon: 'clock', variant: 'tile' },
            { id: 'ci-schema', label: 'Manual schema evo', pattern: 'warn', icon: 'wrench', variant: 'tile' },
            { id: 'ci-scale', label: 'Hundreds of files', pattern: 'network', icon: 'file', variant: 'tile' },
          ],
        },
        {
          id: 'auto-loader-side',
          label: 'Auto Loader',
          pattern: 'service',
          icon: 'waves',
          sub: 'Structured Streaming',
          cols: 2,
          children: [
            { id: 'al-idem', label: 'Streaming checkpoint', pattern: 'service', icon: 'scroll', variant: 'tile' },
            { id: 'al-fit', label: 'Continuous', pattern: 'service', icon: 'repeat', variant: 'tile' },
            { id: 'al-schema2', label: 'Built-in schema evo', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
            { id: 'al-scale', label: 'Millions+', pattern: 'service', icon: 'boxes', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'ci-exam',
      label: 'The common exam pattern',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'continuous + evolving → Auto Loader',
    },
  ],
  edges: [{ source: 'compare', target: 'ci-exam' }],
}
