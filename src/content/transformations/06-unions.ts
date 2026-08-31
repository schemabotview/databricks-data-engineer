import type { Section } from '../types'

export const unions: Section = {
  id: 'unions',
  title: 'Unions & combining',
  scene: 'code-unions',
  slide: `## Unions & combining

Three operations that sound alike and behave differently — and the exam tests the difference directly.

- **\`union\`** — concatenates, matching columns by **position**. Same count, same order. **No dedup**
- **\`unionAll\`** — a deprecated **alias** for \`union\`; identical behaviour
- **\`unionByName(…, allowMissingColumns=)\`** — matches by **name**; \`True\` fills a missing column with \`NULL\` instead of raising

### The trap
Developers expect \`union\` to deduplicate, because SQL's \`UNION\` does. **Spark's \`union\` is SQL's \`UNION ALL\`** — it keeps every duplicate. Chain \`.distinct()\` if you wanted the dedup.

### Rule of thumb
Prefer **\`unionByName\`** in anything that must survive schema change. Positional matching silently corrupts the moment someone reorders a column upstream — values land under the wrong headers and **nothing errors**.`,
  narration:
    "Unions and combining — union, union-all, and union-by-name. Three operations that sound almost the same but behave differently, and the exam tests that difference directly. Union concatenates rows, and it matches columns by position. So both DataFrames must have the same number of columns, in the same order. And critically, union does not deduplicate. Union-all is just a deprecated alias for union. Same behaviour, older name — if you see it, read it as union. Union-by-name matches columns by name instead of by position, which is much safer in production code. And it takes an argument, allow-missing-columns. Set that to true and any column that's missing on one side gets filled with null instead of throwing an error. Now the trap. Developers expect union to deduplicate, because in plain S-Q-L, UNION removes duplicates. But Spark's union is actually closer to S-Q-L's UNION ALL — it keeps every duplicate row. If you want the deduplicated behaviour, you chain dot-distinct after the union. That's a classic exam gotcha, so lock it in: Spark union equals S-Q-L UNION ALL. And a rule of thumb to take with you: prefer union-by-name in any code that has to survive schema changes. Matching by position silently corrupts your data the moment somebody reorders a column upstream — the values line up under the wrong headers and nothing errors. Matching by name protects you from exactly that.",
}
