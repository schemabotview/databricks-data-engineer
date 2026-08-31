import type { Section } from '../types'

export const schema: Section = {
  id: 'schema',
  title: 'Schema enforcement & evolution',
  scene: 'code-schema',
  slide: `## Schema enforcement & evolution

Delta checks the schema on **every write** — the default keeps your table honest.

### Enforcement — on by default
A write that adds an unexpected column **fails**. That is what stops a misbehaving upstream feed from silently growing your table a \`merchant_country\` column nobody asked for.

### Evolution — opt in, per write
- **\`mergeSchema = true\`** — add the incoming DataFrame's missing columns; existing rows get \`NULL\`
- **\`overwriteSchema = true\`** — replace the schema entirely (destructive; rare)
- **\`ALTER TABLE … ADD COLUMNS\`** — explicit DDL, the most auditable and what you want in production

Auto Loader's modes (\`addNewColumns\`, \`rescue\`, \`failOnNewColumns\`, \`none\`) ride this same primitive.

**Exam rule:** enforcement is on by default, evolution is opt-in. **Silent column additions are not a thing on Delta.**`,
  narration:
    "Schema enforcement, and schema evolution. Delta enforces the table's schema on every single write. By default, a write that tries to introduce a new column simply fails. That's schema enforcement, and it's exactly what stops a misbehaving upstream feed from silently growing your Cards table an extra merchant-country column that nobody asked for. But sometimes the new column is intentional. When it is, you opt in to schema evolution, and there are three ways to do it. Merge-schema equals true, set on the write, adds the incoming data frame's missing columns to the table; existing rows just get null in those new columns. Overwrite-schema equals true, on an insert-overwrite, replaces the schema entirely — that's destructive, so use it rarely. And alter-table add-columns is explicit D-D-L — the most auditable option, and the one you want in production. Auto Loader, which we cover in module three, has its own evolution modes — add-new-columns, rescue, fail-on-new-columns, and none — but every one of them is built on this same Delta primitive. Here's the rule that ships straight to the exam. Enforcement is on by default. Evolution is opt-in — either per write, or through an explicit alter-table. Silent column additions are simply not a thing on Delta.",
}
