import type { Scene } from '../../render-engine'

// §4 streaming-table — the pipeline LR, with the point of the section in the middle node: read_files
// in STREAM mode IS the SQL surface of Auto Loader, same checkpoint and exactly-once. The closer
// states what a streaming table IS — a first-class UC object, not hand-written readStream code.
export const streamingTable: Scene = {
  id: 'streaming-table',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'st-flow',
      label: 'Append-only Delta fed by a streaming query',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'st-files', label: 'Landing files', pattern: 'storage', icon: 'cloud', sub: 'a volume path' },
        {
          id: 'st-readfiles',
          label: 'read_files',
          pattern: 'service',
          icon: 'waves',
          sub: 'in STREAM mode — Auto Loader’s SQL',
        },
        { id: 'st-table', label: 'Streaming table', pattern: 'service', icon: 'table', sub: 'appends as rows land' },
      ],
      edges: [
        { source: 'st-files', target: 'st-readfiles' },
        { source: 'st-readfiles', target: 'st-table' },
      ],
    },
    {
      id: 'st-same',
      label: 'Same guarantees as cloudFiles',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'st-ckpt', label: 'Checkpointed', pattern: 'storage', icon: 'scroll', variant: 'tile' },
        { id: 'st-once', label: 'Exactly-once', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
        { id: 'st-uc', label: 'A UC object', pattern: 'user', icon: 'shieldcheck', variant: 'tile' },
      ],
    },
    {
      id: 'st-not',
      label: 'Not imperative',
      pattern: 'warn',
      icon: 'ban',
      sub: 'no hand-written readStream code',
    },
  ],
  edges: [
    { source: 'st-flow', target: 'st-same' },
    { source: 'st-same', target: 'st-not' },
  ],
}
