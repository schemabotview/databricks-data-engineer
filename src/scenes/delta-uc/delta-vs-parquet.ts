import type { Scene } from '../../render-engine'

// §1 delta-vs-parquet — the three things that keep breaking on raw Parquet, then the one thing Delta
// adds. Each failure is a `warn` card because each is precisely what a later guarantee fixes; the
// resolution band names the four guarantees as tiles so it reads as "the SAME files gain all this".
export const deltaVsParquet: Scene = {
  id: 'delta-vs-parquet',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'parquet',
      label: 'Raw Parquet on object storage — just files in a folder',
      pattern: 'group',
      sub: 'also: no time travel · no row-level updates · no audit trail',
      cols: 3,
      children: [
        {
          id: 'p-partial',
          label: 'Partial writes',
          pattern: 'warn',
          icon: 'ban',
          sub: 'a dead job exposes half its files',
        },
        {
          id: 'p-concurrent',
          label: 'Writers corrupt',
          pattern: 'warn',
          icon: 'circleslash',
          sub: 'no lock — last writer wins',
        },
        {
          id: 'p-schema',
          label: 'No schema check',
          pattern: 'warn',
          icon: 'ban',
          sub: 'upstream drift slips through',
        },
      ],
    },
    {
      id: 'delta',
      label: 'Delta Lake — one transaction log over the SAME files',
      pattern: 'service',
      icon: 'layers',
      sub: 'open source, and the default table format on Databricks',
      cols: 4,
      children: [
        { id: 'g-acid', label: 'ACID', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
        { id: 'g-schema', label: 'Schema', pattern: 'service', icon: 'braces', variant: 'tile' },
        { id: 'g-time', label: 'Time travel', pattern: 'service', icon: 'clock', variant: 'tile' },
        { id: 'g-audit', label: 'Audit', pattern: 'service', icon: 'scroll', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'parquet', target: 'delta' }],
}
