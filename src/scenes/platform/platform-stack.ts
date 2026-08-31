import type { Scene } from '../../render-engine'

// §4 platform-stack — the TECHNICAL dependency stack, the counterpart to §2's product pillars: cheap
// open storage at the base, transactions and governance in the middle, every engine on top sharing
// one copy. Naming the engines is what separates this from `platform-pillars`, whose third layer is
// the AI engine rather than compute.
//
// Composition: each layer is a BAND holding its own members as tiles, not a lone 210-wide card. As
// four bare cards the scene was ~240×1000 — a 0.24 ribbon in a roughly square pane, so fitView fit
// the height and left dead space either side (the same trap `../apache-spark`'s evo-overview
// documents). Tiles give every band real width, and the layers STACK edgelessly: an architecture
// stack is read by adjacency, and dropping the flow reclaims 3×GAP_Y (270px) of pure arrow space.
// Children are listed top-down (4 → 1) so layer 1 lands at the base, as the numbering promises.
export const platformStack: Scene = {
  id: 'platform-stack',
  padding: 0.14,
  nodes: [
    {
      id: 'stack',
      label: 'The platform stack — each layer depends on the one below',
      pattern: 'group',
      children: [
        {
          id: 's-engines',
          label: '4 · Engines & workloads',
          pattern: 'service',
          icon: 'zap',
          sub: 'all read THROUGH Unity Catalog',
          cols: 4,
          children: [
            { id: 'e-spark', label: 'Spark', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'e-photon', label: 'Photon', pattern: 'service', icon: 'cpu', variant: 'tile' },
            { id: 'e-dbsql', label: 'Databricks SQL', pattern: 'service', icon: 'database', variant: 'tile' },
            { id: 'e-lakeflow', label: 'Lakeflow', pattern: 'service', icon: 'workflow', variant: 'tile' },
          ],
        },
        {
          id: 's-uc',
          label: '3 · Unity Catalog',
          pattern: 'user',
          icon: 'shieldcheck',
          sub: 'names, secures and audits every asset',
          cols: 3,
          children: [
            { id: 'uc-namespace', label: 'Three-level namespace', pattern: 'user', icon: 'layers', variant: 'tile' },
            { id: 'uc-perms', label: 'Permissions', pattern: 'user', icon: 'key', variant: 'tile' },
            { id: 'uc-lineage', label: 'Lineage & audit', pattern: 'user', icon: 'scroll', variant: 'tile' },
          ],
        },
        {
          id: 's-delta',
          label: '2 · Delta Lake',
          pattern: 'network',
          icon: 'layers',
          sub: 'turns loose files into tables',
          cols: 3,
          children: [
            { id: 'd-acid', label: 'ACID', pattern: 'network', icon: 'circlecheck', variant: 'tile' },
            { id: 'd-schema', label: 'Schema', pattern: 'network', icon: 'braces', variant: 'tile' },
            { id: 'd-time', label: 'Time travel', pattern: 'network', icon: 'clock', variant: 'tile' },
          ],
        },
        {
          id: 's-storage',
          label: '1 · Cloud object storage',
          pattern: 'storage',
          icon: 'cloud',
          sub: 'the cheap, durable base — where bytes sit',
          cols: 3,
          children: [
            { id: 'st-s3', label: 'S3', pattern: 'storage', icon: 'cloud', variant: 'tile' },
            { id: 'st-adls', label: 'ADLS', pattern: 'storage', icon: 'cloud', variant: 'tile' },
            { id: 'st-gcs', label: 'GCS', pattern: 'storage', icon: 'cloud', variant: 'tile' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
