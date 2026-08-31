import type { Section } from '../types'

export const auditLog: Section = {
  id: 'audit-log',
  title: 'Audit log — who did what, when',
  scene: 'audit-log',
  slide: `## The audit log

Every UC permission grant, every table access, every cross-account read is recorded. It is your **forensic source of truth** — *"did anyone query \`customers.email\` outside compliance hours?"* is an audit-log question.

And it isn't just a UI: the **\`system.access\`** schema exposes the data as **queryable tables**, so you write ordinary SQL against it.

### Two tables matter
- **\`system.access.audit\`** — every action: **who, what, when, and from where**
- **\`system.access.table_lineage\`** — which jobs and notebooks read and wrote which tables, down to **column level**. This is what powers the **Lineage** tab in the UC UI

### Two tells
*"Forensic audit — who read this table last Tuesday?"* → **\`audit\`**. *"Track column-level read/write lineage"* → **\`table_lineage\`**.

Because it's SQL and not merely a UI, you can build **alerts and dashboards** on access patterns — monitoring sensitive data the way you'd monitor any other table.`,
  narration:
    "The audit log — who did what, and when. Every Unity Catalog permission grant, every table access, every cross-account read is recorded in the Unity Catalog audit log. It is your forensic source of truth. A question like \"did anyone query silver-dot-customers-dot-email outside of compliance hours?\" is, fundamentally, an audit-log question. And the important thing for the exam: this isn't just a U-I. The system-dot-access schema, inside the system catalog, exposes the audit data as queryable tables. So you can write ordinary S-Q-L against it. In the example, we select event-time, the user's email, the action name, and the object's full name from system-dot-access-dot-audit, filtered to the last day and to objects under fintech-prod-dot-silver-dot-customers, ordered newest first. That's a real forensic query you could run right now. Two tables matter. System-dot-access-dot-audit records every action — who, what, when, and from where. And system-dot-access-dot-table-lineage records which jobs and notebooks read which tables and wrote which tables, right down to column-level lineage. That lineage table is exactly what powers the Lineage tab you see in the Unity Catalog U-I. So, two exam tells. When a question says \"forensic audit — who read this table last Tuesday,\" the answer is system-dot-access-dot-audit. And when it says \"track column-level read and write lineage,\" the answer is system-dot-access-dot-table-lineage, along with the U-C Lineage tab. And the takeaway to hold onto: because the audit log is queryable S-Q-L, not merely a U-I, you can build alerts and dashboards on your access patterns — monitoring who's touching sensitive data the very same way you'd monitor any other table.",
}
