import type { Section } from '../types'

export const liquidClustering: Section = {
  id: 'liquid-clustering',
  title: 'Liquid Clustering',
  scene: 'liquid-clustering',
  slide: `## Liquid Clustering

Partitioning is a **one-time bet** — choose \`transaction_date\` over \`customer_id\` wrong, and re-partitioning a TB-scale table is a full rewrite.

### The old cost
- Over-partitioning → **small files per partition** and **skew** (one partition 100× the rest)
- Cluster keys effectively locked in at create time

### One property, evolvable
- **\`CLUSTER BY (cols)\`** replaces partitioning **and** \`ZORDER\`
- Delta re-balances clusters **incrementally**, in the background
- **Change the keys later** with \`ALTER TABLE … CLUSTER BY\` — no full rewrite

### The trade
- **Give up:** explicit, directory-style partition folders
- **Gain:** no small-file or skew problem, and a layout that evolves as your queries do

**Exam:** Liquid Clustering is the **recommended layout for new Delta tables**.`,
  narration:
    "Liquid Clustering — the modern replacement for partitioning plus Z-order. Classic Delta layouts force you into a one-time decision. Do you partition by transaction-date? By customer-id? Get it wrong and you're stuck, because re-partitioning a terabyte-scale table is a full rewrite. And over-partitioning brings its own problems: the small-files-per-partition problem, and skew, where one partition ends up a hundred times larger than another. Liquid Clustering replaces both partitioning and Z-order with a single declared property. You simply name the columns to cluster by, and Delta organizes the data into clusters that it can re-balance incrementally. And here's the big win: you can change the cluster keys later, without rewriting the whole table. You start clustered by customer-id and transaction time, and if your query patterns shift, you alter the table to cluster by merchant-category instead — and Delta reorganizes gradually, in the background. So what do you give up? The explicit, directory-style partition folders. And what do you gain? No small-files-per-partition problem, no partition skew, and a layout that evolves as your queries evolve. For the exam, remember the recommendation: Liquid Clustering is the recommended layout for new Delta tables.",
}
