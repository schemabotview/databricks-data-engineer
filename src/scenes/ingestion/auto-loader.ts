import type { Scene } from '../../render-engine'

// §3 auto-loader — the mechanism, LR so the pipeline reads left to right and the scene spans the
// pane. The two locations sit in their own band because together they are what makes the write
// exactly-once: the schema cache survives restarts, the checkpoint says what has been processed.
export const autoLoader: Scene = {
  id: 'auto-loader',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'pipeline',
      label: 'Auto Loader — a Structured Streaming source, format("cloudFiles")',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'al-dir', label: 'Cloud directory', pattern: 'storage', icon: 'cloud', sub: 'JSON · CSV · Parquet · Avro' },
        { id: 'al-engine', label: 'Discovers new files', pattern: 'service', icon: 'waves', sub: 'at any scale' },
        { id: 'al-delta', label: 'Delta bronze table', pattern: 'service', icon: 'database', sub: 'exactly-once writes' },
      ],
      edges: [
        { source: 'al-dir', target: 'al-engine' },
        { source: 'al-engine', target: 'al-delta' },
      ],
    },
    {
      id: 'state',
      label: 'Two locations make the restart safe',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'al-schema',
          label: 'Schema cache',
          pattern: 'user',
          icon: 'braces',
          sub: 'schemaLocation — the inferred one',
        },
        {
          id: 'al-ckpt',
          label: 'Checkpoint',
          pattern: 'storage',
          icon: 'scroll',
          sub: 'checkpointLocation — offsets',
        },
      ],
    },
  ],
  edges: [{ source: 'pipeline', target: 'state' }],
}
