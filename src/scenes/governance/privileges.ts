import type { Scene } from '../../render-engine'

// §2 privileges — a recognition list the exam expects on sight, so each card carries what the
// privilege LETS YOU DO rather than a restatement of its name. Ownership sits in its own band
// because it is not a privilege at all: an owner needs no grant, and there is exactly one.
export const privileges: Scene = {
  id: 'privileges',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'privs',
      label: 'What each privilege buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p-use', label: 'USE CATALOG / SCHEMA', pattern: 'warn', icon: 'key', sub: 'see what is inside' },
        { id: 'p-select', label: 'SELECT', pattern: 'service', icon: 'database', sub: 'read rows' },
        { id: 'p-modify', label: 'MODIFY', pattern: 'network', icon: 'wrench', sub: 'INSERT/UPDATE/DELETE + ALTER' },
        { id: 'p-create', label: 'CREATE', pattern: 'network', icon: 'box', sub: 'make objects inside' },
        { id: 'p-execute', label: 'EXECUTE', pattern: 'network', icon: 'braces', sub: 'call a function' },
        { id: 'p-volume', label: 'READ / WRITE VOLUME', pattern: 'storage', icon: 'boxes', sub: 'files, not rows' },
        { id: 'p-browse', label: 'BROWSE', pattern: 'external', icon: 'scanface', sub: 'metadata, NOT data' },
        { id: 'p-tag', label: 'APPLY TAG', pattern: 'user', icon: 'tag', sub: 'tag it — ABAC needs this' },
        { id: 'p-all', label: 'ALL PRIVILEGES', pattern: 'warn', icon: 'shieldcheck', sub: 'everything — sparingly' },
      ],
    },
    {
      id: 'ownership',
      label: 'Ownership is NOT a privilege',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ow-all', label: 'No grant needed', pattern: 'user', icon: 'usercheck', sub: 'and can change the grants' },
        { id: 'ow-one', label: 'Exactly ONE owner', pattern: 'user', icon: 'key', sub: 'ALTER … OWNER TO a group' },
      ],
    },
    {
      id: 'pairs',
      label: 'Two pairs the exam tests',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'pr-rw', label: 'SELECT vs MODIFY', pattern: 'service', icon: 'scale', variant: 'tile' },
        { id: 'pr-bs', label: 'BROWSE vs SELECT', pattern: 'service', icon: 'scale', variant: 'tile' },
      ],
    },
  ],
  edges: [
    { source: 'privs', target: 'ownership' },
    { source: 'ownership', target: 'pairs' },
  ],
}
