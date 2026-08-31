import type { Scene } from '../../render-engine'

// §4 data-skew — the exam describes the symptom almost word for word, so the numbers are on the card
// rather than paraphrased. The remedies are RANKED, and that ranking is the section: AQE skew-join is
// ~99% of exam answers, and salting is only for when a question explicitly rules AQE out.
export const dataSkew: Scene = {
  id: 'data-skew',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'symptom',
      label: 'The UI symptom',
      pattern: 'warn',
      icon: 'gauge',
      sub: '199 tasks in 30s, one at 24 min',
    },
    {
      id: 'diagnosis',
      label: 'One key, 100× rows',
      pattern: 'network',
      icon: 'scale',
      sub: 'median 400 MB · MAX 5 GB',
    },
    {
      id: 'remedies',
      label: 'Three remedies, in order',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'sk-aqe',
          label: '1 · AQE skew-join',
          pattern: 'service',
          icon: 'zap',
          sub: 'splits at runtime · zero code',
        },
        {
          id: 'sk-broadcast',
          label: '2 · Broadcast',
          pattern: 'network',
          icon: 'copy',
          sub: 'kills the shuffle entirely',
        },
        {
          id: 'sk-salt',
          label: '3 · Salt the key',
          pattern: 'warn',
          icon: 'wrench',
          sub: 'heavier surgery — last',
        },
      ],
    },
    {
      id: 'sk-exam',
      label: 'The exam answer',
      pattern: 'service',
      icon: 'circlecheck',
      sub: '~99% option 1 — enable AQE skew-join',
    },
  ],
  edges: [
    { source: 'symptom', target: 'diagnosis' },
    { source: 'diagnosis', target: 'remedies' },
    { source: 'remedies', target: 'sk-exam' },
  ],
}
