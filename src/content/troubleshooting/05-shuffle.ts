import type { Section } from '../types'

export const shuffle: Section = {
  id: 'shuffle',
  title: 'Shuffling — cost & how to cut it',
  scene: 'shuffle',
  slide: `## Shuffling

**The symptom** is distinctive: stage duration dominated by **shuffle write/read time**, with total shuffle write in the hundreds of GB. The network is the bottleneck — the cluster is moving data, not computing.

**Diagnosis:** joins and aggregations need every row for a key on the same executor. Getting them there forces a **shuffle**, the single most expensive thing most jobs do.

### Remedies, in priority order
- **Broadcast** when one side fits in memory → no shuffle at all (course 4)
- **Filter and project early** — the smallest shuffle moves the fewest bytes
- **Right-size \`shuffle.partitions\`** — 1 TB across 200 is **5 GB each** and spills; ~4000 gives **250 MB**, the sweet spot
- **AQE coalesce** merges tiny post-shuffle partitions automatically
- **Avoid a needless \`repartition(N)\`** before a join → a **double shuffle**

**The model:** you can rarely *avoid* a shuffle, but you can **shrink** it (fewer bytes) and **balance** it (partition size + AQE).`,
  narration:
    "Shuffling — why it's so expensive, and how to cut it down. The symptom in the U-I is distinctive. The stage duration is dominated by shuffle-write-time and shuffle-read-time, and the total shuffle write runs into hundreds of gigabytes. In other words, the network is the bottleneck — the cluster is spending its time moving data around, not computing. The diagnosis: joins and aggregations need all the rows for a given key to end up on the same executor. Getting them there forces a shuffle — a redistribution of data across the network. And a shuffle is, honestly, the single most expensive thing most jobs do. So here are the remedies, in priority order. First, broadcast, when one side fits in memory — that means no shuffle at all, and we covered it in module four. Second, filter and project early. The smallest shuffle is the one that moves the fewest bytes, so push your WHERE and your SELECT upstream, and the shuffle carries only what's actually needed. Third, right-size shuffle-partitions. For a one-terabyte shuffle, two hundred partitions means five gigabytes each — far too big, and they'll spill. About four thousand partitions gives you two hundred and fifty megabytes each, which is the sweet spot. Fourth, let A-Q-E coalesce — the adaptive coalesce-partitions setting merges tiny post-shuffle partitions into right-sized ones automatically. And fifth, avoid a needless repartition-N before a join that the optimiser would have shuffled correctly anyway — that just gives you a double shuffle, doing the expensive thing twice. The mental model to carry away is this. You can't always avoid a shuffle — but you can shrink it, by moving fewer bytes, and balance it, by right-sizing the partitions. Broadcast avoids it. Filter-early shrinks it. And partition-sizing plus A-Q-E balance it.",
}
