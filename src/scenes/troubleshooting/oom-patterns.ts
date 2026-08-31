import type { Scene } from '../../render-engine'

// §10 oom-patterns — OOM comes in two flavours and the fix depends entirely on WHICH SIDE ran out, so
// the scene splits on that first. Both sides list memory LAST on purpose: the exam consistently
// rewards fixing the data distribution over throwing RAM at the problem.
export const oomPatterns: Scene = {
  id: 'oom-patterns',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'sides',
      label: 'Which side ran out?',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'oom-executor',
          label: 'Executor OOM',
          pattern: 'warn',
          icon: 'server',
          sub: '“Java heap space” in a task log',
          cols: 2,
          children: [
            { id: 'oe-parts', label: 'Raise partitions', pattern: 'service', icon: 'layers', variant: 'tile' },
            { id: 'oe-aqe', label: 'AQE skew-join', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'oe-udf', label: 'pandas_udf', pattern: 'network', icon: 'code', variant: 'tile' },
            { id: 'oe-mem', label: 'Memory — LAST', pattern: 'warn', icon: 'memory', variant: 'tile' },
          ],
        },
        {
          id: 'oom-driver',
          label: 'Driver OOM',
          pattern: 'warn',
          icon: 'cpu',
          sub: 'reported from the driver — the notebook hangs',
          cols: 2,
          children: [
            { id: 'od-collect', label: 'collect / toPandas', pattern: 'warn', icon: 'ban', variant: 'tile' },
            { id: 'od-broadcast', label: 'Cap broadcast', pattern: 'network', icon: 'copy', variant: 'tile' },
            { id: 'od-mem', label: 'Memory — LAST', pattern: 'warn', icon: 'memory', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'oom-tell',
      label: 'The driver tell',
      pattern: 'service',
      icon: 'circlecheck',
      sub: 'don’t pull it back — keep it distributed',
    },
  ],
  edges: [{ source: 'sides', target: 'oom-tell' }],
}
