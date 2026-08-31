import type { Scene } from '../../render-engine'

// §1 ingestion-patterns — the three shapes every source falls into, then the trigger vocabulary the
// exam tests by name. Incremental is `service` (the brand colour) because that is where most
// production ingestion actually lives; the other two are neutral by comparison.
export const ingestionPatterns: Scene = {
  id: 'ingestion-patterns',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      label: 'Every source falls into one of three shapes',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'batch',
          label: 'Batch',
          pattern: 'external',
          icon: 'boxes',
          sub: 'the full dataset, every time',
        },
        {
          id: 'incremental',
          label: 'Incremental',
          pattern: 'service',
          icon: 'repeat',
          sub: 'only new/changed · MOST production',
        },
        {
          id: 'streaming',
          label: 'Streaming',
          pattern: 'network',
          icon: 'waves',
          sub: 'continuous · seconds to minutes',
        },
      ],
    },
    {
      id: 'vocab',
      label: 'Exam vocabulary',
      pattern: 'group',
      sub: 'same engine — the trigger is what changes',
      cols: 3,
      children: [
        { id: 'v-available', label: 'Trigger.AvailableNow', pattern: 'service', icon: 'circlecheck', variant: 'tile' },
        { id: 'v-processing', label: 'Trigger.ProcessingTime', pattern: 'network', icon: 'clock', variant: 'tile' },
        { id: 'v-checkpoint', label: 'Checkpoint location', pattern: 'storage', icon: 'scroll', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'shapes', target: 'vocab' }],
}
