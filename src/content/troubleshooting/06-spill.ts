import type { Section } from '../types'

export const spill: Section = {
  id: 'spill',
  title: 'Disk spilling',
  scene: 'disk-spill',
  slide: `## Disk spilling

**The symptom** is easy to read: stage detail shows a **non-zero Spill** column — memory or disk. The executors are writing intermediate state out to disk because it didn't fit in RAM.

**Why it hurts:** spilled data is written to disk, read back, de-serialised, and rejoined. That round trip is **orders of magnitude** slower than staying in memory.

### Remedies
- **Raise \`shuffle.partitions\`** — more, smaller partitions that each fit. Usually the first and cleanest lever
- **Increase executor memory** — trade-off: bigger executors, fewer per node
- **Filter or aggregate earlier**, to shrink the per-partition payload
- **Enable AQE**, so it coalesces to the optimal size at runtime

**Exam:** *"200 GB across 200 partitions, tasks spilling"* → raise \`shuffle.partitions\` to ~1000–2000, so each lands at 100–200 MB.

**Watch the direction** — **more** partitions, not fewer. Consolidating into fewer tasks is exactly backwards: fewer means bigger, which spills harder.`,
  narration:
    "Disk spilling — what happens when a stage runs out of memory. The symptom is easy to read in the U-I: the stage detail shows a non-zero spill column — either spill-memory or spill-disk. That means the executors are writing intermediate state out to disk, because it didn't fit in R-A-M. Why does spilling hurt so much? Because spilled data has to be written to disk, then read back, often de-serialised, and joined back in. That whole round trip is orders of magnitude slower than just staying in memory. A stage that spills can be many times slower than the exact same stage that fits — so spill is one of the highest-value things to eliminate. The remedies. First, increase shuffle-partitions — more, smaller partitions that each fit in memory. That's usually the first and cleanest lever. Second, increase executor memory — but mind the trade-off, because bigger executors mean fewer of them per node. Third, filter or aggregate earlier, to shrink the per-partition payload. And fourth, enable A-Q-E, so it coalesces partitions to the optimal size at runtime. Now the exam pattern, and it's a specific one. \"A job is shuffling two hundred gigabytes across two hundred partitions, and tasks are spilling to disk.\" The cleanest single-config answer is: raise shuffle-partitions, so each partition lands in the hundred-to-two-hundred-megabyte range — which for two hundred gigabytes is roughly one thousand to two thousand partitions. And note the direction carefully, because it's a classic trap. You want more partitions, not fewer. Fewer partitions makes each one bigger, which spills harder. The instinct to \"consolidate into fewer tasks\" is exactly wrong here.",
}
