import type { Scene } from '../../render-engine'

// §2 run-history — the section's claim is that the SHAPE of the sparkline is itself the first
// diagnosis, so each shape card carries its cause directly and the band below names where each one
// sends you next. Trend against baseline, not one run in isolation.
export const runHistory: Scene = {
  id: 'run-history',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      label: 'Three shapes, three diagnoses',
      pattern: 'group',
      sub: 'the value is the TREND against baseline, not one run',
      cols: 3,
      children: [
        {
          id: 'rh-ramp',
          label: 'Gradual ramp',
          pattern: 'network',
          icon: 'gauge',
          sub: 'data growth · progressive skew',
        },
        {
          id: 'rh-step',
          label: 'Step change',
          pattern: 'service',
          icon: 'gitbranch',
          sub: 'a code, config or runtime change',
        },
        {
          id: 'rh-spike',
          label: 'Spiky',
          pattern: 'warn',
          icon: 'zap',
          sub: 'contention · a bad-data day',
        },
      ],
    },
    {
      id: 'points-at',
      label: 'Where each one sends you',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'pa-capacity', label: 'ramp → capacity', pattern: 'network', icon: 'server', variant: 'tile' },
        { id: 'pa-changed', label: 'step → what shipped', pattern: 'service', icon: 'clock', variant: 'tile' },
        { id: 'pa-noise', label: 'spike → who else ran', pattern: 'warn', icon: 'boxes', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'shapes', target: 'points-at' }],
}
