import type { Scene } from '../../render-engine'

// §2 delta-log — what a Delta table IS on disk (data files + `_delta_log` beside them), then how the
// commit buys each ACID letter. The four letters are tiles in one band so the section's claim — that
// atomic commits are what make ACID possible on object storage — reads as one row, not four beats.
export const deltaLog: Scene = {
  id: 'delta-log',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      label: 'A Delta table = data files + a log beside them',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'data-files',
          label: 'Parquet files',
          pattern: 'storage',
          icon: 'file',
          sub: 'ordinary columnar bytes',
        },
        {
          id: 'log',
          label: '_delta_log',
          pattern: 'service',
          icon: 'scroll',
          sub: 'ordered JSON commits',
          cols: 3,
          children: [
            { id: 'a-add', label: 'add', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
            { id: 'a-remove', label: 'remove', pattern: 'network', icon: 'ban', variant: 'tile' },
            { id: 'a-meta', label: 'metaData', pattern: 'user', icon: 'braces', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'acid',
      label: 'The commit IS the transaction',
      pattern: 'group',
      sub: 'readers replay the log · a checkpoint every 10 commits keeps reads fast',
      cols: 4,
      children: [
        { id: 'c-a', label: 'A · next .json', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
        { id: 'c-c', label: 'C · validated', pattern: 'service', icon: 'shieldcheck', variant: 'tile' },
        { id: 'c-i', label: 'I · optimistic', pattern: 'service', icon: 'repeat', variant: 'tile' },
        { id: 'c-d', label: 'D · object store', pattern: 'storage', icon: 'cloud', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'acid' }],
}
