import type { Section } from '../types'

export const materializedViews: Section = {
  id: 'materialized-views',
  title: 'Materialized views',
  scene: 'materialized-view',
  slide: `## Materialized views

A query result Databricks computes **once**, stores as Delta, and refreshes on a cadence you declare — \`CREATE OR REPLACE MATERIALIZED VIEW … SCHEDULE EVERY 1 HOUR AS SELECT …\`.

### What it buys
- **Incremental refresh** — only the affected rows recompute when base tables change
- **Consistent reads** — read it like a table, never exposed to a half-written base table
- **Cheap for BI** — a precomputed result instead of re-running a 50-billion-row aggregation
- **A declarative schedule** — the cadence lives *with the object*, not in a separate Jobs definition you must keep in sync

### The exam pattern
An MV is the answer whenever a heavy aggregation is read **frequently** and refreshed on a **cadence**. A plain view recomputes every read; a streaming table is continuous append, not periodic aggregation.`,
  narration:
    "Materialized views — precomputed, auto-refreshed, and queried just like a table. A materialized view — an M-V — is a query result that Databricks computes once, stores as Delta, and then refreshes on a cadence you declare, or whenever you explicitly call refresh-materialized-view. Look at the shape. You write create-or-replace-materialized-view, give it a name like gold-dot-customer-360, add a schedule — say, every one hour — and then an ordinary select underneath. Here that select rolls up each customer's transaction count, total spend, and distinct merchants over the last thirty days. The key thing is that the schedule lives right there, attached to the object. So what does an M-V actually buy you? Four things. Incremental refresh — when the base tables change, only the affected rows recompute, where the query supports it, rather than rebuilding everything. Consistent reads — you read it like a table, and you're never exposed to a base table that's halfway through a write. Cheap for B-I — analysts hit a precomputed result instead of re-running a fifty-billion-row aggregation. And a declarative schedule — the cadence lives with the object, not off in a separate Lakeflow Jobs definition you have to keep in sync. And here's the exam pattern to lock in: the M-V is the right answer whenever a question describes a heavy aggregation that B-I reads frequently, refreshed on a cadence. Contrast it with the two neighbours. A plain view recomputes on every read, so it loses on repeated heavy reads. And a streaming table is continuous append, not periodic aggregation — so it's the answer for continuously arriving records, not for a scheduled rollup.",
}
