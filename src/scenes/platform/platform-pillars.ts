import type { Scene } from '../../render-engine'

// §2 platform-pillars — the PRODUCT framing of the Data Intelligence Platform: five workloads all
// reading one governed copy, over the three layers Databricks describes it in. (§4's `platform-stack`
// is the other cut — the technical dependency stack — so the two sections do not share a scene.)
//
// Each pillar is a BAND holding its own members as tiles, the same treatment §4 gets. As three lone
// cards the pillars ran ~240 wide against ~560 tall — a narrow column with dead space either side —
// and each card's `sub` could only carry a truncated version of what the slide says. Tiles give the
// bands real width AND let each pillar state its actual content. Listed 3 → 1 so layer 1 lands at the
// bottom; edgeless, because a stack is read by adjacency and the numbering carries the direction
// (dropping the flow also reclaims 2×GAP_Y of pure arrow space).
export const platformPillars: Scene = {
  id: 'platform-pillars',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'workloads',
      label: 'Every workload — one governed copy',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 'w-de', label: 'Data eng', pattern: 'external', icon: 'gears', variant: 'tile' },
        { id: 'w-sql', label: 'SQL / BI', pattern: 'external', icon: 'database', variant: 'tile' },
        { id: 'w-stream', label: 'Streaming', pattern: 'external', icon: 'waves', variant: 'tile' },
        { id: 'w-ds', label: 'Data science', pattern: 'external', icon: 'brain', variant: 'tile' },
        { id: 'w-ml', label: 'ML', pattern: 'external', icon: 'zap', variant: 'tile' },
      ],
    },
    {
      id: 'pillars',
      label: 'Built in three layers',
      pattern: 'group',
      children: [
        {
          id: 'p-intelligence',
          label: '3 · Intelligence engine',
          pattern: 'service',
          icon: 'brain',
          sub: 'generative AI reads your data’s semantics',
          cols: 3,
          children: [
            { id: 'pi-search', label: 'NL search', pattern: 'service', icon: 'scanface', variant: 'tile' },
            { id: 'pi-optimize', label: 'Auto-optimize', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'pi-defaults', label: 'Smart defaults', pattern: 'service', icon: 'gears', variant: 'tile' },
          ],
        },
        {
          id: 'p-governance',
          label: '2 · Unified governance',
          pattern: 'user',
          icon: 'shieldcheck',
          sub: 'Unity Catalog — not an ACL system per tool',
          cols: 3,
          children: [
            { id: 'pg-model', label: 'One permission', pattern: 'user', icon: 'key', variant: 'tile' },
            { id: 'pg-assets', label: 'Every asset', pattern: 'user', icon: 'boxes', variant: 'tile' },
            { id: 'pg-workspaces', label: 'All workspaces', pattern: 'user', icon: 'globe', variant: 'tile' },
          ],
        },
        {
          id: 'p-foundation',
          label: '1 · Open foundation',
          pattern: 'storage',
          icon: 'layers',
          sub: 'no vendor locks the bytes away',
          cols: 3,
          children: [
            { id: 'pf-delta', label: 'Delta tables', pattern: 'storage', icon: 'table', variant: 'tile' },
            { id: 'pf-storage', label: 'YOUR storage', pattern: 'storage', icon: 'cloud', variant: 'tile' },
            { id: 'pf-open', label: 'Any engine', pattern: 'storage', icon: 'braces', variant: 'tile' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'workloads', target: 'pillars', label: 'all run against one copy' }],
}
