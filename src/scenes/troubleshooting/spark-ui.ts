import type { Scene } from '../../render-engine'

// §3 spark-ui — three nested tabs, then the signal→diagnosis lookup that is the real content. The
// habit the narration ends on drives the layout: read MAX vs MEDIAN first, because that one
// comparison separates skew from a uniformly heavy stage, and they need opposite fixes.
export const sparkUi: Scene = {
  id: 'spark-ui',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'tabs',
      label: 'Three tabs, nested — once you know which task',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'ui-jobs', label: 'Jobs', pattern: 'external', icon: 'workflow', sub: 'one row per action' },
        { id: 'ui-stages', label: 'Stages', pattern: 'network', icon: 'layers', sub: 'one row per shuffle boundary' },
        { id: 'ui-detail', label: 'Stage detail', pattern: 'service', icon: 'gauge', sub: 'the task summary metrics' },
      ],
      edges: [
        { source: 'ui-jobs', target: 'ui-stages' },
        { source: 'ui-stages', target: 'ui-detail' },
      ],
    },
    {
      id: 'signals',
      label: 'Signal → diagnosis',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'sg-skew', label: 'Max ≫ median', pattern: 'warn', icon: 'scale', sub: '→ skew' },
        { id: 'sg-shuffle', label: 'Huge shuffle write', pattern: 'warn', icon: 'network', sub: '→ network-bound' },
        { id: 'sg-spill', label: 'Spill > 0', pattern: 'warn', icon: 'memory', sub: '→ memory pressure' },
        { id: 'sg-gc', label: 'High GC fraction', pattern: 'warn', icon: 'clock', sub: '→ OOM soon' },
        { id: 'sg-tiny', label: 'Many tasks < 100 ms', pattern: 'warn', icon: 'boxes', sub: '→ over-fragmented' },
        { id: 'sg-dead', label: 'Dead executor', pattern: 'warn', icon: 'ban', sub: '→ OOM (Executors tab)' },
      ],
    },
    {
      id: 'habit',
      label: 'Max vs median FIRST',
      pattern: 'service',
      icon: 'scale',
      sub: 'skew vs uniform — different fixes',
    },
  ],
  edges: [
    { source: 'tabs', target: 'signals' },
    { source: 'signals', target: 'habit' },
  ],
}
