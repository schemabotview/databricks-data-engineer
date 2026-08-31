import type { Section } from '../types'

export const maintenance: Section = {
  id: 'maintenance',
  title: 'OPTIMIZE, ZORDER, VACUUM',
  scene: 'code-maintenance',
  slide: `## Table maintenance

Three commands every Delta table needs over its life.

### Compact, cluster, reclaim
- **\`OPTIMIZE\`** — compacts many small files into fewer ~1 GB files; small files (from streaming and \`MERGE\`) mean slow reads
- **\`ZORDER BY (cols)\`** — co-locates similar values so file-skipping improves; \`ZORDER BY (customer_id)\` reads **~1% of files** for a per-customer lookup
- **\`VACUUM\`** — deletes \`remove\`-d files older than retention (**default 7 days**); the one that actually reclaims storage

### The guardrail
Delta **blocks** a shorter \`VACUUM\` retention unless you explicitly override it — a short window breaks readers still in flight and destroys time travel.

On UC **managed** tables, **Predictive Optimization** runs these for you automatically (course 8).`,
  narration:
    "Table maintenance — optimize, Z-order, and vacuum. Three commands every Delta table needs over its lifetime. Optimize compacts many small files into fewer files, each near a one-gigabyte target. Streaming writes and merge operations create a lot of small files, and small files mean slow reads. Optimize is a metadata-level rewrite that cuts the file count right down, without changing anything about what the table actually contains. Z-order-by co-locates rows with similar values into the same files. That makes file-skipping at read time dramatically better for any query filtering on those columns. Z-order by customer-id on the card-transactions table lets a single-customer lookup read about one percent of the files, instead of all of them. Vacuum is the one that actually deletes bytes. It removes the data files that were marked for removal more than the retention window ago — seven days by default. This is what reclaims your storage cost. And here's an important guardrail: Delta blocks you from setting a shorter retention unless you explicitly override it, because a short retention window can break readers that are still in flight, and it destroys your ability to time-travel. One more thing for later: on Unity Catalog managed tables, Predictive Optimization can run optimize and vacuum for you, automatically. We come back to that in module eight.",
}
