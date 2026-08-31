import type { Section } from '../types'

export const applyChanges: Section = {
  id: 'apply-changes',
  title: 'APPLY CHANGES INTO — CDC & SCD',
  scene: 'code-apply-changes',
  slide: `## APPLY CHANGES INTO

You *can* hand-write \`MERGE INTO\` for CDC — and it works. But it's verbose and genuinely **race-prone**, especially for type-2 history. \`APPLY CHANGES INTO\` is the declarative-pipeline equivalent, with SCD type 1 or 2 baked in.

### Five clauses to memorise
- **\`KEYS\`** — the natural key for the upsert
- **\`SEQUENCE BY\`** — the ordering column deciding *"latest wins"* when changes arrive late or out of order
- **\`APPLY AS DELETE WHEN\`** — propagate hard deletes from the source
- **\`STORED AS SCD TYPE 1\`** — overwrite in place, no history
- **\`STORED AS SCD TYPE 2\`** — start/end timestamps plus an \`is_current\` flag, maintained automatically

### Why the exam loves it
A hand-rolled SCD 2 merge closes the old row, inserts the new version, sets flags and timestamps — racing other writers throughout. \`APPLY CHANGES … SCD TYPE 2\` is one declarative block that does all of it correctly.`,
  narration:
    "Apply-changes-into — declarative change-data-capture and slowly-changing dimensions. You can hand-write merge-into for C-D-C — we did that back in module two — and it works. But it's verbose, and it's genuinely race-prone, especially for type-2 history. Apply-changes-into is the declarative-pipeline equivalent, with S-C-D type one or type two baked right in. The shape is: first create-or-refresh a streaming table as the target. Then apply-changes-into that target, from a stream of the C-D-C source, and you supply a handful of clauses. Five clauses are worth memorising. Keys names the natural key for the upsert — customer-i-d. Sequence-by names the ordering column that decides \"latest wins\" when changes arrive late or out of order — here, commit-version. Apply-as-delete-when propagates hard deletes from the source, so a delete upstream becomes a delete in your table. Stored-as-S-C-D-type-1 overwrites in place and keeps no history. And stored-as-S-C-D-type-2 keeps full history for you — start and end timestamps, plus an is-current flag — all maintained automatically. And here's why the exam loves this. A hand-rolled S-C-D type-2 merge is a multi-statement affair — you're closing out the old row, inserting the new version, setting flags and timestamps, and racing other writers the whole time. Apply-changes-into, stored-as-S-C-D-type-2, is a single declarative block that does all of that correctly. So whenever a question asks for declarative C-D-C that keeps full history, the answer is apply-changes-into with S-C-D type two — not a hand-written merge.",
}
