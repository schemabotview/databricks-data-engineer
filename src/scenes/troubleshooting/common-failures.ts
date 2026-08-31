import type { Scene } from '../../render-engine'

// §9 common-failures — four startup modes, each labelled by the ERROR STRING, because that is how a
// scenario question names it. The `warn` tell is the trap: InstanceLimitExceeded is cloud quota, not
// memory — so the wrong instinct is to reach for a memory setting.
export const commonFailures: Scene = {
  id: 'common-failures',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'startup',
      label: 'Cluster won’t start — the Event Log tab is the truth',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'cf-quota',
          label: 'Instance limit',
          pattern: 'warn',
          icon: 'ban',
          sub: 'cloud quota → AZ, type, serverless',
        },
        {
          id: 'cf-iam',
          label: 'NotAuthorized / 403',
          pattern: 'warn',
          icon: 'key',
          sub: 'IAM → fix role trust and policies',
        },
        {
          id: 'cf-init',
          label: 'Init script',
          pattern: 'warn',
          icon: 'terminal',
          sub: 'INIT_SCRIPT_FAILURE — read the log',
        },
        {
          id: 'cf-lib',
          label: 'Library install',
          pattern: 'warn',
          icon: 'box',
          sub: 'Libraries tab → remove or pin',
        },
      ],
    },
    {
      id: 'conflicts',
      label: 'Library conflicts — the resolution order',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'lc-pip', label: 'Notebook %pip', pattern: 'service', icon: 'code', variant: 'tile' },
        { id: 'lc-pin', label: 'Pin versions', pattern: 'service', icon: 'lock', variant: 'tile' },
        { id: 'lc-ml', label: 'ML runtime', pattern: 'network', icon: 'brain', variant: 'tile' },
        { id: 'lc-serverless', label: 'Serverless', pattern: 'service', icon: 'zap', variant: 'tile' },
      ],
    },
    {
      id: 'cf-tell',
      label: 'The trap',
      pattern: 'warn',
      icon: 'circleslash',
      sub: 'quota is NOT a memory setting',
    },
  ],
  edges: [
    { source: 'startup', target: 'conflicts' },
    { source: 'conflicts', target: 'cf-tell' },
  ],
}
