import type { Section } from '../types'

export const autoLoader: Section = {
  id: 'auto-loader',
  title: 'Auto Loader — cloudFiles, the workhorse',
  scene: 'auto-loader',
  slide: `## Auto Loader — cloudFiles

A Structured Streaming source (\`format("cloudFiles")\`) that does one job at any scale: **discover new files and stream them into Delta**, with checkpointed exactly-once writes.

### The options the exam asks for
- **\`cloudFiles.format\`** — the file format: JSON, CSV, Parquet, Avro, binaryFile, text
- **\`cloudFiles.schemaLocation\`** — where the inferred schema is cached across runs
- **\`cloudFiles.schemaEvolutionMode\`** — what happens when a new column appears
- **\`checkpointLocation\`** — on the writer: the offsets already processed
- **\`trigger(availableNow=True)\`** — process everything there now, then stop (replaces \`trigger.once\`)

### It beats COPY INTO when
File counts are huge, files arrive **continuously** rather than in a daily drop, you want schema evolution **built in**, or you may later flip to a continuous trigger without a rewrite.`,
  narration:
    "Auto Loader — cloud-files, the workhorse. Auto Loader is a Structured Streaming source, identified by the format string cloud-files. It does exactly one job, and it does it at any scale: discover new files in a cloud directory, and stream them into a Delta table, with checkpointed, exactly-once writes. The shape is the same every time. On the read stream, you set the format to cloud-files, you tell it the underlying file format with cloud-files-dot-format — say JSON — and you give it a schema location. Then on the write stream, you give it a checkpoint location, a trigger, and the target table. A handful of options come up on the exam. Cloud-files-dot-format is the underlying file format — JSON, C-S-V, Parquet, Avro, binary-file, or text. Schema-location is where Auto Loader caches the inferred schema across runs. Schema-evolution-mode controls what happens when a new column appears — we'll cover that shortly. Checkpoint-location, on the writer, is where Structured Streaming tracks the offsets it has processed. And trigger available-now means: process every file that exists right now, then stop — that's the modern replacement for trigger-once. So when does Auto Loader beat copy-into? When the number of files per run is huge — thousands to millions. When new files arrive continuously, rather than in a single daily drop. When you want schema evolution baked in, not bolted on. And when you'd like the option to flip from a scheduled run to a continuous one later, without rewriting the pipeline.",
}
