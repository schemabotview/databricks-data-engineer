import type { Scene } from '../../render-engine'

// §9 managed-vs-external — the one difference (who owns the FILES) and everything it drives. Each
// flavour is a band holding what it gets, so the asymmetry the exam tests — Predictive Optimization
// is managed-only — is visible rather than stated. The closer carries the default and the converters.
export const managedVsExternal: Scene = {
  id: 'managed-vs-external',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'flavours',
      label: 'Every UC table is one flavour or the other',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'managed',
          label: 'Managed',
          pattern: 'service',
          icon: 'shieldcheck',
          sub: 'UC owns metadata AND files · DROP deletes both',
          cols: 2,
          children: [
            { id: 'm-po', label: 'Predictive Opt', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'm-lifecycle', label: 'Full lifecycle', pattern: 'service', icon: 'repeat', variant: 'tile' },
          ],
        },
        {
          id: 'external',
          label: 'External',
          pattern: 'network',
          icon: 'cloud',
          sub: 'UC owns metadata only · files at YOUR path',
          cols: 2,
          children: [
            { id: 'x-drop', label: 'DROP keeps files', pattern: 'network', icon: 'file', variant: 'tile' },
            { id: 'x-nopo', label: 'No Predictive Opt', pattern: 'warn', icon: 'ban', variant: 'tile' },
          ],
        },
      ],
    },
    {
      id: 'choose',
      label: 'Prefer MANAGED',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'ALTER TABLE … SET MANAGED / EXTERNAL',
    },
  ],
  edges: [{ source: 'flavours', target: 'choose' }],
}
