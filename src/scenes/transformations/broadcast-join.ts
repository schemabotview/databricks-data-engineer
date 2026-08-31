import type { Scene } from '../../render-engine'

// §5 broadcast-join — the problem band on top (both sides shuffle) and the fix below (ship the small
// side, big side never moves). Drawing the three executors as tiles is what makes "a full copy to
// EVERY executor" concrete — and it is also why the `warn` closer matters: that copy must fit.
export const broadcastJoin: Scene = {
  id: 'broadcast-join',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'normal',
      label: 'Normal join — BOTH sides shuffle by key',
      pattern: 'group',
      sub: 'the single most expensive thing in the job, once both sides are large',
      cols: 2,
      children: [
        { id: 'big-side', label: 'Big side', pattern: 'warn', icon: 'database', sub: 'moves across the network' },
        { id: 'small-side', label: 'Small side', pattern: 'warn', icon: 'file', sub: 'moves across the network' },
      ],
    },
    {
      id: 'broadcast',
      label: 'Broadcast — ship the SMALL side to every executor',
      pattern: 'service',
      icon: 'copy',
      sub: 'big side never moves · NO shuffle · auto under 10 MB',
      cols: 3,
      children: [
        { id: 'ex-1', label: 'Executor + copy', pattern: 'service', icon: 'server', variant: 'tile' },
        { id: 'ex-2', label: 'Executor + copy', pattern: 'service', icon: 'server', variant: 'tile' },
        { id: 'ex-3', label: 'Executor + copy', pattern: 'service', icon: 'server', variant: 'tile' },
      ],
    },
    {
      id: 'bj-watch',
      label: 'Watch out',
      pattern: 'warn',
      icon: 'ban',
      sub: 'a side > driver memory blows the driver',
    },
  ],
  edges: [
    { source: 'normal', target: 'broadcast' },
    { source: 'broadcast', target: 'bj-watch' },
  ],
}
