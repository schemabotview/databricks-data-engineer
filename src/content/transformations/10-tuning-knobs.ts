import type { Section } from '../types'

export const tuningKnobs: Section = {
  id: 'tuning-knobs',
  title: 'Performance tuning — the four knobs',
  scene: 'tuning-knobs',
  slide: `## The four tuning knobs

Course 8 owns deep tuning, but the exam names four configuration keys, and you need to know what each controls.

- **\`spark.sql.shuffle.partitions\`** — partitions after a shuffle (joins, aggregations). Default **200**. The most tested
- **\`spark.default.parallelism\`** — the default partition count for **RDD** operations; rarely touched in DataFrame work
- **\`spark.executor.memory\`** / **\`.driver.memory\`** — heap per executor and driver
- **\`spark.sql.autoBroadcastJoinThreshold\`** — the auto-broadcast max, **10 MB**; \`-1\` disables it

### The classic question
> *"200 GB shuffling across 200 partitions, tasks spilling to disk — what do you change?"*

Raise **\`shuffle.partitions\`** so each lands at **100–200 MB**. Too few → spill and OOM; too many → tiny empty tasks. **AQE** coalesces them automatically, which is why modern clusters lean on it.`,
  narration:
    "Performance tuning knobs — the four the exam asks about by name. You won't do deep performance tuning in this module — module eight owns that — but the exam's Section 3 explicitly names four configuration keys, and you need to know what each one controls. The first, and the most tested, is spark-dot-s-q-l-dot-shuffle-dot-partitions. It sets how many partitions Spark creates after a shuffle — that means after joins and aggregations. The default is two hundred. On a big job you raise it, to a thousand or more, so each partition holds less data and you avoid spilling and out-of-memory. On a tiny job you drop it, maybe to eight, so you're not spawning hundreds of empty tasks. The second is spark-dot-default-dot-parallelism. That's the default partition count for R-D-D operations. You rarely touch it in DataFrame work — it's mostly an R-D-D knob. Third are the memory settings: spark-executor-memory and spark-driver-memory, the heap per executor and per driver. If your executor tasks run out of memory, you raise executor memory. If a collect-to-driver crashes the driver, you raise driver memory. Fourth is the auto-broadcast-join-threshold we met earlier — the max size Spark will auto-broadcast, ten megabytes by default. Raise it past a hundred megabytes for bigger dimension tables, or set it to minus one to disable auto-broadcast entirely. And here's exactly how the exam phrases the classic question: \"a job is shuffling two hundred gigabytes across two hundred partitions and tasks are spilling to disk — what do you change?\" The answer is raise shuffle-partitions, so each partition lands in the hundred-to-two-hundred-megabyte range. Too few partitions and you spill; too many and you drown in tiny empty tasks. And note — A-Q-E coalesces shuffle partitions automatically when it's on, which is why modern clusters lean on it rather than hand-setting two hundred.",
}
