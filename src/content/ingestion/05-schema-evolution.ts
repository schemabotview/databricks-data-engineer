import type { Section } from '../types'

export const schemaEvolution: Section = {
  id: 'schema-evolution',
  title: 'Auto Loader — schema evolution modes',
  scene: 'code-cloudfiles-schema',
  slide: `## Schema inference & evolution

Auto Loader infers the schema on the first batch and caches it at \`schemaLocation\`. Every later batch is compared against that cache; **\`schemaEvolutionMode\`** decides what a new column does.

- **\`addNewColumns\`** *(default)* — the stream fails; restart evolves the schema and continues. Best for production: **no silent drift**, recovery is a restart
- **\`rescue\`** — never fails; unknown columns land in \`_rescued_data\`
- **\`failOnNewColumns\`** — fails until *you* evolve it: for regulated data needing human review
- **\`none\`** — silently ignored; only when you fully control upstream

### \`_rescued_data\`
Anything that didn't fit — a new column, or an uncastable value — lands there as JSON. With \`rescue\`, **nothing the source emits is ever silently dropped**, which is what audit needs. **\`schemaHints\`** pins a few types without writing a full schema.`,
  narration:
    "Auto Loader — schema inference and evolution modes. Auto Loader infers the schema on the first batch — or from a hint you supply — and it caches that schema at the schema-location. On every subsequent batch, it compares the incoming file's schema against that cache. What happens when there's a difference is controlled by the option schema-evolution-mode, and there are four modes. Add-new-columns is the default. When a new column shows up, the stream fails on that file. You restart it, and on restart it picks up the new column, evolves the schema, and continues. That sounds disruptive, but it's actually the best fit for production — there's no silent drift, and recovery is just a restart. Rescue mode never fails. Unknown columns are captured into a single rescued-data column instead of being dropped. Nothing fails, and nothing is silently lost. Fail-on-new-columns is the strictest. The stream fails permanently until you explicitly evolve the schema yourself and restart — that's for regulated data where a new column genuinely needs human review. And none simply ignores new columns, silently. Use that only when you fully control the upstream and a new column would be a bug. Now, that rescued-data column is worth dwelling on. Auto Loader can add an underscore-rescued-data column to every row, and anything that didn't fit the schema — a brand-new column, or a value that couldn't be cast — lands there as JSON. Combined with rescue mode, that means nothing the source emits is ever silently dropped, which is critical for audit and reconciliation. And if you just want to pin a few types without writing a full schema, schema-hints lets you do exactly that.",
}
