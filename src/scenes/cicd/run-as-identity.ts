import type { Scene } from '../../render-engine'

// §8 run-as-identity — the exam sometimes conflates two DIFFERENT questions, so the scene separates
// them first: who deploys the bundle vs. who runs the resources afterwards. The `warn` closer gives
// the reason a service principal is required in prod, which is what a scenario question really tests.
export const runAsIdentity: Scene = {
  id: 'run-as-identity',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'two-questions',
      label: 'Two DIFFERENT questions',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'who-deploys',
          label: 'Who deploys?',
          pattern: 'network',
          icon: 'boxes',
          sub: 'the principal running bundle deploy',
          children: [
            { id: 'wd-ci', label: 'In CI', pattern: 'network', icon: 'key', sub: 'a service principal, OAuth M2M' },
          ],
        },
        {
          id: 'who-runs',
          label: 'Who runs the resources?',
          pattern: 'service',
          icon: 'workflow',
          sub: 'run_as, set per target',
          children: [
            { id: 'wr-dev', label: 'dev', pattern: 'external', icon: 'usercheck', sub: 'the developer' },
            { id: 'wr-prod', label: 'test / prod', pattern: 'service', icon: 'key', sub: 'a service principal' },
          ],
        },
      ],
    },
    {
      id: 'boundary',
      label: 'The SP permission boundary',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'sp-use', label: 'USE CATALOG + SCHEMA', pattern: 'user', icon: 'shieldcheck', variant: 'tile' },
        { id: 'sp-tables', label: 'SELECT / MODIFY', pattern: 'user', icon: 'database', variant: 'tile' },
        { id: 'sp-runs', label: 'CAN_MANAGE_RUN', pattern: 'user', icon: 'workflow', variant: 'tile' },
      ],
    },
    {
      id: 'why-sp',
      label: 'Why not a person',
      pattern: 'warn',
      icon: 'ban',
      sub: 'the job breaks when they leave',
    },
  ],
  edges: [
    { source: 'two-questions', target: 'boundary' },
    { source: 'boundary', target: 'why-sp' },
  ],
}
