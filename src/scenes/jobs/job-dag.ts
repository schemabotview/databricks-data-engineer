import type { Scene } from '../../render-engine'

// §2 job-dag — the one scene in the concept that is literally the thing it describes: a real DAG,
// which this engine lays out natively from the edges. Three roots fanning into silver_build is the
// section's whole claim — you declare dependencies, and the scheduler finds the parallelism itself.
export const jobDag: Scene = {
  id: 'job-dag',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'dag',
      label: 'Declare DEPENDENCIES, not order → self-parallelising',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'd-cards', label: 'Cards', pattern: 'network', icon: 'waves', sub: 'a root — no depends_on' },
        { id: 'd-accounts', label: 'Accounts', pattern: 'network', icon: 'waves', sub: 'runs in parallel' },
        { id: 'd-loans', label: 'Loans', pattern: 'network', icon: 'waves', sub: 'runs in parallel' },
        { id: 'd-silver', label: 'Silver build', pattern: 'service', icon: 'layers', sub: 'waits for all three' },
        { id: 'd-gold', label: 'Gold rollup', pattern: 'service', icon: 'database', sub: 'gold_customer_360' },
        { id: 'd-dash', label: 'dashboard', pattern: 'user', icon: 'monitor', sub: 'refresh AI/BI' },
      ],
      edges: [
        { source: 'd-cards', target: 'd-silver' },
        { source: 'd-accounts', target: 'd-silver' },
        { source: 'd-loans', target: 'd-silver' },
        { source: 'd-silver', target: 'd-gold' },
        { source: 'd-gold', target: 'd-dash' },
      ],
    },
    {
      id: 'dag-settings',
      label: 'Three settings the exam tests',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ds-depends', label: 'depends_on', pattern: 'service', icon: 'gitbranch', sub: 'empty = a root task' },
        { id: 'ds-runif', label: 'run_if', pattern: 'service', icon: 'circlecheck', sub: 'ALL_DONE always fires' },
        { id: 'ds-retries', label: 'max_retries', pattern: 'network', icon: 'repeat', sub: 'exponential backoff' },
      ],
    },
  ],
  edges: [{ source: 'dag', target: 'dag-settings' }],
}
