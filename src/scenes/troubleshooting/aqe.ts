import type { Scene } from '../../render-engine'

// §7 aqe — the course's through-line lands here: the three big problems the last three sections
// covered (skew, partition sizing, join strategy) are exactly the three things AQE fixes at runtime.
// The scene draws that correspondence, which is why "confirm AQE is enabled" is the default answer
// and manual tuning is the fallback.
export const aqe: Scene = {
  id: 'aqe',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'what',
      label: 'Re-optimises the plan AT RUNTIME, on actual stats',
      pattern: 'group',
      sub: 'after each shuffle — not the planner’s up-front estimates',
      cols: 3,
      children: [
        {
          id: 'aqe-coalesce',
          label: 'Coalesce partitions',
          pattern: 'service',
          icon: 'layers',
          sub: 'merge undersized ones',
        },
        {
          id: 'aqe-join',
          label: 'Switch join strategy',
          pattern: 'service',
          icon: 'copy',
          sub: 'sort-merge → broadcast',
        },
        {
          id: 'aqe-skew',
          label: 'Skew-join handling',
          pattern: 'service',
          icon: 'scale',
          sub: 'split oversized partitions',
        },
      ],
    },
    {
      id: 'covers',
      label: 'Which is exactly this course’s three problems',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'cv-skew', label: 'skew (§4)', pattern: 'network', icon: 'scale', variant: 'tile' },
        { id: 'cv-parts', label: 'partition size (§5–6)', pattern: 'network', icon: 'layers', variant: 'tile' },
        { id: 'cv-join', label: 'join strategy (§5)', pattern: 'network', icon: 'copy', variant: 'tile' },
      ],
    },
    {
      id: 'default-on',
      label: 'On since DBR 11',
      pattern: 'service',
      icon: 'circlecheck',
      sub: '“is AQE on?” — tuning is fallback',
    },
  ],
  edges: [
    { source: 'what', target: 'covers' },
    { source: 'covers', target: 'default-on' },
  ],
}
