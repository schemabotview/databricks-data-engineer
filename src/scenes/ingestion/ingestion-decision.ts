import type { Scene } from '../../render-engine'

// §11 ingestion-decision — the course's closing cheat sheet, built like `compute-decision` in the
// platform course: source SHAPE in the label, the pick in the sub, cols:2 so six rows fill the pane
// instead of running as a thin column. The slide keeps the full ten-row table; this is the spine.
export const ingestionDecision: Scene = {
  id: 'ingestion-decision',
  padding: 0.18,
  nodes: [
    {
      id: 'sheet',
      label: 'Files or an API? · streaming, incremental, or daily?',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'ds-daily',
          label: 'Daily drop, few files',
          pattern: 'network',
          icon: 'clock',
          sub: '→ COPY INTO',
        },
        {
          id: 'ds-continuous',
          label: 'Continuous, drifts',
          pattern: 'service',
          icon: 'waves',
          sub: '→ Auto Loader',
        },
        {
          id: 'ds-billions',
          label: 'Billion-file scale',
          pattern: 'service',
          icon: 'bell',
          sub: '→ + file notification',
        },
        {
          id: 'ds-saas',
          label: 'SaaS or DB with CDC',
          pattern: 'service',
          icon: 'plug',
          sub: '→ Lakeflow Connect (managed)',
        },
        {
          id: 'ds-kafka',
          label: 'Kafka / Kinesis',
          pattern: 'network',
          icon: 'waves',
          sub: '→ Structured Streaming',
        },
        {
          id: 'ds-federate',
          label: 'Small, cold, no copies',
          pattern: 'external',
          icon: 'globe',
          sub: '→ Lakehouse Federation',
        },
      ],
    },
  ],
  edges: [],
}
