import type { Scene } from '../../render-engine'

// §10 volumes — the tables/volumes split (rows vs. files) drawn as peers under Unity Catalog, then
// the two volume flavours mirroring the two table flavours from §9. The `warn` closer is the exam's
// actual trigger: whenever a question is about governing files that are NOT Delta tables.
export const volumes: Scene = {
  id: 'volumes',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'uc-governs',
      label: 'Unity Catalog governs both',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'v-tables',
          label: 'Tables — rows',
          pattern: 'service',
          icon: 'database',
          sub: 'catalog.schema.table',
        },
        {
          id: 'v-volumes',
          label: 'Volumes — files',
          pattern: 'storage',
          icon: 'boxes',
          sub: 'files under /Volumes/…',
        },
      ],
    },
    {
      id: 'v-flavours',
      label: 'Two flavours, mirroring tables',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'v-managed',
          label: 'Managed volume',
          pattern: 'service',
          icon: 'shieldcheck',
          sub: 'UC owns the location',
        },
        {
          id: 'v-external',
          label: 'External volume',
          pattern: 'network',
          icon: 'dooropen',
          sub: 'a path you own — SFTP drops',
        },
      ],
    },
    {
      id: 'v-mounts',
      label: 'Replaces dbfs:/mnt/…',
      pattern: 'warn',
      icon: 'ban',
      sub: 'mounts had no UC permissions',
    },
  ],
  edges: [
    { source: 'v-volumes', target: 'v-flavours' },
    { source: 'v-flavours', target: 'v-mounts' },
  ],
}
