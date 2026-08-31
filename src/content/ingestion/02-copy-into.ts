import type { Section } from '../types'

export const copyInto: Section = {
  id: 'copy-into',
  title: 'COPY INTO — idempotent SQL ingestion',
  scene: 'code-copy-into',
  slide: `## COPY INTO

A SQL statement that loads files into a Delta table and **remembers which it has already loaded**. That idempotency is the whole point.

- The target is a UC-governed Delta table; the source path is usually a **UC volume**
- Re-running the same statement is a **no-op** for files already taken — Delta records the loaded paths
- Formats: \`CSV\`, \`JSON\`, \`AVRO\`, \`ORC\`, \`PARQUET\`, \`XML\`, \`BINARYFILE\`

### The two option groups the exam tests
- **\`FORMAT_OPTIONS\`** — *reader* options describing the source, e.g. \`'header' = 'true'\`
- **\`COPY_OPTIONS\`** — *Delta writer* options describing target behaviour, e.g. \`'mergeSchema' = 'true'\`

### Pick COPY INTO when
A **daily batch** of few files on a predictable cadence (a scheduled Jobs task), and you want declarative SQL with no streaming machinery to debug.`,
  narration:
    "Copy-into — idempotent file ingestion, in pure S-Q-L. Copy-into is a S-Q-L statement that loads files from a cloud storage location into a Delta table, remembers which files it has already loaded, and skips them on the next run. That one property — idempotency — is exactly what makes it the right answer for daily-batch file loads. The shape is simple. You copy-into a target Delta table, from a folder in a volume, you name the file format — say C-S-V — and you pass a couple of option groups. The target is a Unity-Catalog-governed Delta table, and the source path can be in any object store the workspace can reach, usually referenced through a U-C volume. After the first run, Delta records the loaded file paths, so re-running the very same statement is a no-op for the files it already took. That's the idempotency in action. Watch the two option groups, because the exam likes to test them. Format-options are the reader options — they describe the source format, like header equals true. Copy-options are the Delta writer options — they describe the target table behaviour, like merge-schema. So pick copy-into when you have a small-to-moderate number of files per run, a predictable cadence — typically a scheduled Lakeflow Jobs task — and you want declarative S-Q-L with no streaming machinery to debug. The supported formats are C-S-V, JSON, Avro, ORC, Parquet, X-M-L, and binary file.",
}
