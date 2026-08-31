import type { Section } from '../types'

export const abac: Section = {
  id: 'abac',
  title: 'Unity Catalog ABAC',
  scene: 'abac',
  slide: `## Unity Catalog ABAC

Per-table masks and filters work — but they **don't scale**. Attaching the same mask to the same PII column across hundreds of tables, and remembering it for every new table, is not a plan.

ABAC lets you define a policy **once** and apply it everywhere a table or column carries a **tag**.

### Three building blocks
- **Tags** — labels on a catalog, schema, table or column: \`pii_class = high\`
- **Policies** — one central rule: *"mask any column tagged \`pii_class high\` outside compliance"*
- **Evaluation** — at query time UC reads the object's tags, finds matching policies, applies them **on top of** the principal's grants

### The payoff
Add a brand-new PII column on a brand-new table, tag it — and the **existing policy already covers it**. Nothing per-table to remember.

**Exam:** *"centralised masking and filtering **across hundreds of tables**"* → **ABAC**. Per-table is the manual answer.`,
  narration:
    "Unity Catalog A-B-A-C — attribute-based access control. The per-table row filters and column masks we just covered work well — but they don't scale. Imagine attaching a mask to the same P-I-I column on hundreds of tables, and remembering to do it every time someone adds a new table. That's where A-B-A-C comes in: it lets you define a policy once, and apply it everywhere a table or column carries a specific tag. There are three building blocks. Tags are labels you attach to catalogs, schemas, tables, or columns — things like p-i-i-class equals high, or data-domain equals cards. Policies are central rules, like \"mask any column tagged p-i-i-class high for everyone outside the compliance group.\" And evaluation happens at query time: Unity Catalog reads the queried object's tags, finds the matching policies, and applies them on top of the principal's grants. In the example, you first tag the email column with p-i-i-class high. Then you create one policy — mask-high-p-i-i — that says: on any column matching the tag p-i-i-class high, apply the mask-email function, when the caller is not a member of compliance. One policy, defined once. And here's the payoff. Add a brand-new P-I-I column, on a brand-new table, tag it p-i-i-class high — and the existing policy already covers it. There's no per-table mask to remember, no risk of forgetting. Governance scales automatically as your data grows. The exam tell is clear. When a question describes \"centralised row-level filtering and column masking for sensitive data across many objects,\" the answer is Unity Catalog A-B-A-C. Per-table masks and filters are the manual answer; A-B-A-C plus tags is the scale answer. The words that give it away are usually \"across hundreds of tables,\" or \"centralised.\"",
}
