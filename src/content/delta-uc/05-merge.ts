import type { Section } from '../types'

export const merge: Section = {
  id: 'merge',
  title: 'MERGE INTO, UPDATE, DELETE',
  scene: 'code-merge',
  slide: `## Changing data — MERGE, UPDATE, DELETE

Delta does row-level changes on immutable storage. **\`MERGE INTO\`** is the workhorse — the most-used Delta DML in production.

### MERGE — one statement, every case
- Joins a **source** of changes to the **target** on a key
- \`WHEN MATCHED … UPDATE\` · \`WHEN NOT MATCHED … INSERT\` · \`WHEN NOT MATCHED BY SOURCE … DELETE\`
- **SCD Type 1** — update in place, no history
- **SCD Type 2** — close the old row, insert a new active one (\`APPLY CHANGES INTO\` wraps this)

### UPDATE / DELETE — two strategies
- **Copy-on-write** — rewrite each file holding matching rows (expensive for a few rows in a big file)
- **Deletion vectors** (the modern default) — a small bitmap marks skipped rows; the file stays, and \`OPTIMIZE\` resolves it later

Deletion vectors turn a GDPR delete from a **multi-GB rewrite** into a **tiny commit**.`,
  narration:
    "Changing data — merge-into, update, and delete. Delta supports row-level changes even though object storage is immutable. The workhorse is merge-into — the single most-used piece of Delta D-M-L in production. It joins a source of incoming changes to the target table on a key, and lets you say what to do in each case: when a row matches, update it; when it doesn't match, insert it; and optionally, when a target row isn't in the source at all, delete it. Two patterns the bank leans on constantly. Slowly-changing-dimension type one is an overwrite — a customer's city changes, so you just update it in place, and keep no history. Type two keeps history — you close the old row by setting is-current to false and stamping a valid-to date, then insert a fresh active row. Apply-changes-into, which we'll see in module five, is really a declarative wrapper over this exact machinery. Plain update and delete work too, and there are two strategies underneath. Copy-on-write rewrites every Parquet file that holds a matching row — correct, but expensive when only a handful of rows in a big file actually change. Deletion vectors, the modern default, instead write a small bitmap that says \"skip rows seventeen and two-thirty-four in this file.\" The Parquet file stays exactly where it is, reads apply the bitmap on the fly, and the next optimize resolves it for real. For the bank, that's the difference between a G-D-P-R \"right to be forgotten\" delete being a multi-gigabyte file rewrite, and it being a tiny, instant commit.",
}
