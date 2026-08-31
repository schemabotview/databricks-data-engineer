import type { Scene } from '../../render-engine'

// §4 control-flow — three primitives, and the `warn` closer is the one the exam plants distractors
// around: a flaky API is a RETRIES problem, not a for_each or a continuous-trigger problem. The
// if/else branch is drawn as a real fork because branching is what the task actually does.
export const controlFlow: Scene = {
  id: 'control-flow',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'branch',
      label: 'if / else — route the DAG',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'cf-cond', label: 'is_friday', pattern: 'service', icon: 'gitbranch', sub: 'a boolean expression' },
        { id: 'cf-true', label: 'True branch', pattern: 'service', icon: 'circlecheck', sub: 'run_fraud_rebuild' },
        { id: 'cf-false', label: 'False branch', pattern: 'external', icon: 'circleslash', sub: 'skip_to_dashboard' },
      ],
      edges: [
        { source: 'cf-cond', target: 'cf-true' },
        { source: 'cf-cond', target: 'cf-false' },
      ],
    },
    {
      id: 'foreach',
      label: 'for_each — the child runs once per item, in parallel',
      pattern: 'group',
      sub: 'each child gets its item as {{input}}',
      cols: 4,
      children: [
        { id: 'fe-cards', label: 'cards', pattern: 'network', icon: 'box', variant: 'tile' },
        { id: 'fe-accounts', label: 'accounts', pattern: 'network', icon: 'box', variant: 'tile' },
        { id: 'fe-loans', label: 'loans', pattern: 'network', icon: 'box', variant: 'tile' },
        { id: 'fe-payments', label: 'payments', pattern: 'network', icon: 'box', variant: 'tile' },
      ],
    },
    {
      id: 'retries',
      label: 'Flaky API ~1%?',
      pattern: 'warn',
      icon: 'repeat',
      sub: 'max_retries = 3 — not for_each',
    },
  ],
  edges: [
    { source: 'branch', target: 'foreach' },
    { source: 'foreach', target: 'retries' },
  ],
}
