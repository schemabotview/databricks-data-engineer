import type { Scene } from '../../render-engine'

// §5 triggers — the exam frames nearly every trigger question as ONE tradeoff, time-based vs.
// data-driven, so the scene splits on that axis rather than listing five options flat. The `warn`
// closer is the classic scenario, with the distractor named outright.
export const triggers: Scene = {
  id: 'triggers',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'trigger-kinds',
      label: 'What fires a run',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'time-based',
          label: 'Time-based',
          pattern: 'network',
          icon: 'clock',
          sub: 'predictable landing · stable SLA window',
          children: [
            { id: 'tb-cron', label: 'Scheduled (cron)', pattern: 'network', icon: 'clock', sub: '0 0 2 * * ? = daily 02:00' },
          ],
        },
        {
          id: 'data-driven',
          label: 'Data-driven',
          pattern: 'service',
          icon: 'waves',
          sub: 'variable landing · minimise latency',
          children: [
            { id: 'dd-file', label: 'File arrival', pattern: 'service', icon: 'file', sub: 'new files land in a path' },
            { id: 'dd-table', label: 'Table update', pattern: 'service', icon: 'database', sub: 'a new Delta commit' },
          ],
        },
      ],
    },
    {
      id: 'also',
      label: 'Two more',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tr-cont', label: 'Continuous', pattern: 'external', icon: 'repeat', sub: 'pipeline only' },
        { id: 'tr-manual', label: 'Manual', pattern: 'external', icon: 'usercheck', sub: 'human or API — backfills' },
      ],
    },
    {
      id: 'tr-classic',
      label: 'Unknown arrival time',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'File arrival, not cron',
    },
  ],
  edges: [
    { source: 'trigger-kinds', target: 'also' },
    { source: 'also', target: 'tr-classic' },
  ],
}
