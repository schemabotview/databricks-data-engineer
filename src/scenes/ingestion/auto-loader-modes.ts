import type { Scene } from '../../render-engine'

// §4 auto-loader-modes — the discovery trade. Listing's ceiling is a `warn` tile because that ceiling
// IS the reason to switch; notification's three queue services are tiles so "a managed event queue"
// reads as a concrete cloud dependency rather than an abstraction.
export const autoLoaderModes: Scene = {
  id: 'auto-loader-modes',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'discovery',
      label: 'Two ways to discover new files — a cost and scale trade',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'listing',
          label: 'Directory listing',
          pattern: 'network',
          icon: 'scroll',
          sub: 'the default · lists and diffs each batch',
          children: [
            { id: 'l-nothing', label: 'No extra infra', pattern: 'network', icon: 'circlecheck', variant: 'tile' },
            { id: 'l-cap', label: 'Caps at millions', pattern: 'warn', icon: 'ban', variant: 'tile' },
          ],
          cols: 2,
        },
        {
          id: 'notification',
          label: 'File notification',
          pattern: 'service',
          icon: 'bell',
          sub: 'useNotifications = true · no listing at all',
          children: [
            { id: 'n-sqs', label: 'SQS + SNS', pattern: 'service', icon: 'cloud', variant: 'tile' },
            { id: 'n-grid', label: 'Event Grid', pattern: 'service', icon: 'cloud', variant: 'tile' },
            { id: 'n-pubsub', label: 'Pub/Sub', pattern: 'service', icon: 'cloud', variant: 'tile' },
          ],
          cols: 3,
        },
      ],
    },
    {
      id: 'al-exam',
      label: 'Exam',
      pattern: 'warn',
      icon: 'circlecheck',
      sub: 'millions → listing · 100M+ → notification',
    },
  ],
  edges: [{ source: 'discovery', target: 'al-exam' }],
}
