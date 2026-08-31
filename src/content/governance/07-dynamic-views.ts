import type { Section } from '../types'

export const dynamicViews: Section = {
  id: 'dynamic-views',
  title: 'Dynamic views — the older alternative',
  scene: 'code-dynamic-views',
  slide: `## Dynamic views

Before column masks and row filters were first-class, this is how you did the same job: a regular view whose \`SELECT\` uses \`CASE WHEN is_account_group_member(…)\` to mask columns **and** filter rows, all in one object.

### When you'd still use one
Only two situations: very **simple** cases where a view is quick and clear, and compatibility with **non-UC clients** that don't understand masks and filters.

### Why masks, filters and ABAC won
- They apply to the **base table**, so every reader and every query path gets them — no *"somebody forgot to use the secure view"* failure mode, which is the classic weakness of the view approach
- They **compose with ordinary grants**, instead of forcing you to re-grant a separate view
- **ABAC scales them across many tables** via tags

**Exam:** dynamic views are **legacy**; masks + filters + ABAC are the modern answer. Pick the view only when the question names a non-UC client.`,
  narration:
    "Dynamic views — the older, fine-grained alternative. Before column masks and row filters became first-class features, this was how you did the same job: a dynamic view. It's a regular view whose select uses case-when-is-account-group-member to mask columns and filter rows, all in one object. In the example, customers-secure selects from silver-dot-customers. For the email column, it uses a case: if you're in compliance, return the real email, otherwise return REDACTED. And in the WHERE clause, another case filters the rows: compliance-i-n sees only Indian rows, broad compliance sees everything, and everyone else sees nothing. So one view does both masking and row-filtering — but it does it in the view's own S-Q-L, not on the base table. When would you still use a dynamic view? Really just two situations. Very simple cases, where a view is quick and clear. Or compatibility with non-U-C clients that don't understand masks and filters. But for almost everything else, masks plus row filters — and A-B-A-C — are preferred now, for three reasons. First, they apply to the base table, so every reader and every query path gets them; there's no \"somebody forgot to use the secure view\" failure mode, which is the classic weakness of the view approach. Second, they compose with ordinary grants, instead of forcing you to re-grant a whole separate view. And third, A-B-A-C scales them across many tables via tags. So the exam framing is: dynamic views are the legacy fine-grained control; column masks, row filters, and A-B-A-C are the modern answer. If a question contrasts them, pick masks and filters — unless it specifically calls for the old view-based approach, or mentions a non-U-C client.",
}
