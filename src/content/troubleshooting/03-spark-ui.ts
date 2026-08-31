import type { Section } from '../types'

export const sparkUi: Section = {
  id: 'spark-ui',
  title: 'Spark UI — reading the tabs',
  scene: 'spark-ui',
  slide: `## Spark UI

Once you've localised the slow task, the Spark UI is the microscope. Three tabs, nested: **Jobs** (a row per action) → **Stages** (a row per stage — the work between two shuffles) → **stage detail**, where the gold is: the Tasks table, and the **task summary metrics** (min/25th/median/75th/max).

### Signal → diagnosis
- **Max duration ≫ median** → **skew**; one partition is far bigger
- **Very large total shuffle write** → shuffle-heavy: big joins or aggregations
- **Spill > 0** → memory pressure; partitions don't fit RAM
- **GC a large fraction of task time** → memory pressure, OOM imminent
- **Many tasks under 100 ms** → over-fragmentation, too many partitions
- **Executors tab: a dead executor** → usually OOM

**The habit:** read **max-vs-median first**. That one comparison separates skew from a uniformly heavy stage — and they need completely different fixes.`,
  narration:
    "The Spark U-I — reading the tabs that actually matter. Once you've localised the slow task, the Spark U-I is your microscope. Three tabs matter, and they nest inside each other. The Jobs tab has one row per action — the slow job is simply the slow row. The Stages tab has one row per stage, where a stage is the unit of work between two shuffles — again, the slow stage is the slow row, and you click into it. And the stage detail page is the gold. There you read two things. The Tasks table, one row per task, sortable by duration, shuffle read, or spill. And the task summary metrics — min, twenty-fifth percentile, median, seventy-fifth, and max — for duration, G-C time, shuffle read and write, and spill. Now, what do those summary signals mean? Let me give you the lookup. Max task duration much greater than the median means skew — one partition is far bigger than the rest. A very large total shuffle write means the stage is shuffle-heavy — big joins or aggregations. Spill, memory or disk, greater than zero means memory pressure — the partitions don't fit in R-A-M. G-C time that's a large fraction of task time also means memory pressure, and possibly that an out-of-memory error is imminent. And many tiny tasks finishing in under a hundred milliseconds means over-fragmentation — too many shuffle partitions. There's also the Executors tab, which shows per-executor memory and disk pressure, and any failed or dead executors — and a dead executor usually points straight at an out-of-memory error. If you take one habit from this: read max-versus-median first. That single comparison separates skew, where max is much greater than median, from a uniformly heavy stage, where all the tasks are large. And those two problems need completely different fixes — so telling them apart is where diagnosis begins.",
}
