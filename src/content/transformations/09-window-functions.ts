import type { Section } from '../types'

export const windowFunctions: Section = {
  id: 'window-functions',
  title: 'Window functions',
  scene: 'code-windows',
  slide: `## Window functions

A window computes a value **per row** from the rows around it — and unlike \`groupBy\` it does **not collapse** rows. You keep every row and gain a computed column. That distinction is the whole point.

### Three ingredients
**\`partitionBy\`** (the group) · **\`orderBy\`** (the order within it) · optionally a **frame** (\`rowsBetween\` / \`rangeBetween\`).

### Three jobs the exam tests
1. **Dedup** — \`row_number\` over the window, keep \`rn = 1\`: the latest row per key, and **deterministic** where \`dropDuplicates\` is not
2. **Period-over-period** — \`lag\` pulls the previous row's value, \`lead\` looks forward
3. **Running total** — an **explicit frame**, \`rowsBetween(unboundedPreceding, currentRow)\`, summed

**\`rank\`** leaves gaps after ties; **\`dense_rank\`** does not.`,
  narration:
    "Window functions — the pattern that silver and gold both lean on. A window function computes a value per row, using a window of other rows around it — but, unlike group-by, it does not collapse your rows. You keep every row and get an extra computed column alongside it. That distinction is the whole point. There are three ingredients. Partition-by defines the group — say, per customer. Order-by defines the order within that group — say, by transaction time. And optionally you add a frame, using rows-between or range-between, to say how many rows around the current one to include. Let's tie that to the three jobs the exam actually tests, because it's remarkably consistent about them. Job one, deduplication. Partition by customer, order by transaction time descending, apply row-number, and keep row-number equals one. That gives you the latest row per key — the S-C-D-latest pattern — and it's deterministic, which drop-duplicates is not. Job two, period-over-period. Using the same window, lag pulls the previous row's value — the previous transaction's amount — so you can compute the change since last time. Lead does the same looking forward. Job three, running totals. Here you add an explicit frame — rows-between unbounded-preceding and current-row — and sum over it, giving a per-customer running total that grows down the ordered rows. So remember the trio: row-number for dedup, lag and lead for period-over-period, and sum with a frame for running totals. And rounding out the ranking family, rank leaves gaps after ties while dense-rank does not — a small detail the exam sometimes slips in.",
}
