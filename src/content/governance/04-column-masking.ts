import type { Section } from '../types'

export const columnMasking: Section = {
  id: 'column-masking',
  title: 'Column masking',
  scene: 'code-masking',
  slide: `## Column masking

A **function** that runs at query time on a column, deciding — from the caller's identity — whether to return the real value or a masked one.

**Two steps.** Declare the mask as a UC function branching on \`is_account_group_member\`, then attach it with \`ALTER TABLE … ALTER COLUMN … SET MASK\`.

From that moment every read of the column runs through the mask — **whatever the query path, whatever the BI tool**. Remove it with \`DROP MASK\`.

### Why not just a view?
A mask is applied to the **base table**, so there's no *"someone forgot to use the secure view"* escape hatch. The mask travels with the column itself, and every reader gets it automatically.

**Exam:** *"hide the PAN from analysts, show last-4 to the fraud team"* → a **column mask** branching on group membership.`,
  narration:
    "Column masking. A column mask is a function that runs at query time on a specific column, and decides — typically based on the current user or their group — whether to return the real value or a masked version. It's two steps. First, you declare the mask as a Unity Catalog function. In the example, mask-pan takes a P-A-N string and returns a string, using a case expression. If the caller is a member of the fraud-analysts group, it returns the last four digits with the rest X-ed out. If they're in compliance, it returns the full value. And otherwise, it returns the literal \"REDACTED\". So the same column yields different values depending on who's asking. Second, you attach that function to a column with alter-table, alter-column, set-mask. From that moment on, every read of card-accounts-dot-pan runs through mask-pan — and this is the crucial part — no matter the query path or the B-I tool. The function has access to current-user, is-account-group-member, and the other security functions, so it can branch on identity however you need. To remove it, you alter-column drop-mask. And here's the exam tell. When a question says \"hide the P-A-N from analysts but show the last four to the fraud team,\" the answer is a column mask that branches on is-account-group-member. Note carefully why it's better than just a view: a column mask is applied to the base table, so there's no \"oops, someone forgot to use the secure view\" escape hatch. The mask travels with the column itself — every reader gets it, automatically.",
}
