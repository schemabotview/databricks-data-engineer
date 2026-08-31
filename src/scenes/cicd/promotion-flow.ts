import type { Scene } from '../../render-engine'

// §7 promotion-flow — the pipeline, FOLDED into its two real stages rather than run as one flat
// six-card chain. Flat it was ~1480×400, a 3.7 ribbon in a ~1.05 pane, so fitView fit the width and
// rendered everything tiny (the mirror of the too-tall trap in the repo CLAUDE.md). Folding also
// tells the truth better: the narration describes TWO CI stages — one fired by the pull request, one
// by the merge — which a single chain hides. The smoke job stays inline as the gate before prod.
export const promotionFlow: Scene = {
  id: 'promotion-flow',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'stage-pr',
      label: 'Stage 1 — on the pull request',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'pf-pr', label: 'Pull request', pattern: 'external', icon: 'gitbranch', sub: 'commit and push' },
        { id: 'pf-validate', label: 'validate', pattern: 'network', icon: 'circlecheck', sub: 'all three targets' },
        { id: 'pf-merge', label: 'Merge to main', pattern: 'user', icon: 'usercheck', sub: 'after human review' },
      ],
      edges: [
        { source: 'pf-pr', target: 'pf-validate' },
        { source: 'pf-validate', target: 'pf-merge' },
      ],
    },
    {
      id: 'stage-merge',
      label: 'Stage 2 — on the merge',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'pf-test', label: 'deploy -t test', pattern: 'service', icon: 'boxes', sub: 'the test workspace' },
        { id: 'pf-smoke', label: 'Smoke job', pattern: 'warn', icon: 'shieldcheck', sub: 'the gate — wait for green' },
        { id: 'pf-prod', label: 'deploy -t prod', pattern: 'service', icon: 'shieldcheck', sub: 'only if smoke passed' },
      ],
      edges: [
        { source: 'pf-test', target: 'pf-smoke' },
        { source: 'pf-smoke', target: 'pf-prod' },
      ],
    },
    {
      id: 'when',
      label: 'Which verb runs when',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-pr', label: 'validate on every PR', pattern: 'network', icon: 'circlecheck', variant: 'tile' },
        { id: 'w-merge', label: 'deploy on merge', pattern: 'service', icon: 'boxes', variant: 'tile' },
        { id: 'w-portable', label: 'same on any cloud', pattern: 'user', icon: 'cloud', variant: 'tile' },
      ],
    },
  ],
  edges: [
    { source: 'stage-pr', target: 'stage-merge' },
    { source: 'stage-merge', target: 'when' },
  ],
}
