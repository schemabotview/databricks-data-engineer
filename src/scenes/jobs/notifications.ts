import type { Scene } from '../../render-engine'

// §8 notifications — four hooks, and two exam tells that are really about picking the RIGHT hook:
// paging wants a webhook (not email), and a production job wants a service principal (not a person).
// The always-run task gets its own note because it can DO work, not just send a message.
export const notifications: Scene = {
  id: 'notifications',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'hooks',
      label: 'Four ways a job talks to humans and systems',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'n-email',
          label: 'Email',
          pattern: 'external',
          icon: 'bell',
          sub: 'start · success · failure · duration',
        },
        {
          id: 'n-webhook',
          label: 'Webhooks',
          pattern: 'service',
          icon: 'plug',
          sub: 'Slack · Teams · PagerDuty · HTTP',
        },
        {
          id: 'n-runas',
          label: 'Run-as identity',
          pattern: 'user',
          icon: 'usercheck',
          sub: 'governs the job’s UC permissions',
        },
        {
          id: 'n-alldone',
          label: 'Always-run task',
          pattern: 'service',
          icon: 'circlecheck',
          sub: 'run_if ALL_DONE — can also do work',
        },
      ],
    },
    {
      id: 'tells',
      label: 'Two exam tells',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-page', label: 'Page on-call', pattern: 'warn', icon: 'bell', sub: '→ webhook, NOT email' },
        { id: 't-sp', label: 'Not one engineer', pattern: 'warn', icon: 'key', sub: '→ a service principal' },
      ],
    },
  ],
  edges: [{ source: 'hooks', target: 'tells' }],
}
