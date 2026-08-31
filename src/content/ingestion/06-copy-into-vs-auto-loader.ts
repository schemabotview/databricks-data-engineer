import type { Section } from '../types'

export const copyIntoVsAutoLoader: Section = {
  id: 'copy-into-vs-auto-loader',
  title: 'COPY INTO vs. Auto Loader',
  scene: 'ingestion-compare',
  slide: `## COPY INTO vs. Auto Loader

Both load files from object storage into Delta, and **both are idempotent** — Auto Loader via its streaming checkpoint, COPY INTO via Delta's tracked load history. So you don't pick on correctness. You pick on **operational shape**.

- **API** — pure SQL · vs · a DataFrame Structured Streaming job
- **Best for** — daily batch, small-to-medium file counts · vs · continuous or high-volume incremental
- **Schema evolution** — manual per run (\`mergeSchema\`) · vs · built in
- **Throughput** — hundreds to low thousands of files · vs · millions and beyond with notification
- **Latency** — whatever cadence the cron gives it · vs · down to seconds with a continuous trigger

### The single most common exam pattern
Files arrive **continuously and the schema may evolve** → **Auto Loader**. A **single batch once a day**, simple SQL preferred → **\`COPY INTO\`**.`,
  narration:
    "Copy-into versus Auto Loader — when each one wins. Both of these load files from object storage into Delta, and both are idempotent — Auto Loader through its streaming checkpoint, copy-into through Delta's tracked load history. So you don't pick between them on correctness; you pick on operational shape. Start with the A-P-I. Copy-into is pure S-Q-L; Auto Loader is a data frame, a Structured Streaming job. Their idempotency mechanisms differ — a Delta-tracked list of loaded files versus a streaming checkpoint. Copy-into is best for daily batch with small-to-medium file counts; Auto Loader is best for continuous or high-volume incremental. Schema evolution is manual per run with copy-into — you pass merge-schema — but it's built in with Auto Loader. On throughput, copy-into tops out around hundreds to low thousands of files per run, while Auto Loader goes to millions and beyond with file notification. And on latency, copy-into runs at whatever cadence your cron gives it, while Auto Loader can get down to seconds with a continuous trigger. If you remember one thing, remember the single most common exam question pattern. When the scenario says new files arrive continuously and the schema may evolve — that's Auto Loader. When it says a single batch of files lands once a day and simple S-Q-L is preferred — that's copy-into.",
}
