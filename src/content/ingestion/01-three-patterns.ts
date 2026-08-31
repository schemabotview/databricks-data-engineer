import type { Section } from '../types'

export const threePatterns: Section = {
  id: 'three-patterns',
  title: 'Batch, incremental, streaming',
  scene: 'ingestion-patterns',
  slide: `## Three ingestion patterns

Every source falls into one of three shapes — and which one you're looking at drives every later choice.

### Batch · incremental · streaming
- **Batch** — the full dataset every time; simple, but wasteful when only 1% of rows changed
- **Incremental** — only new or changed records since the last load; **most production ingestion lives here**
- **Streaming** — records flow in continuously and the target updates within seconds; same engine, continuous trigger

### Exam vocabulary
- **\`Trigger.AvailableNow\`** (was \`Trigger.Once\`) — process what's there, then stop: micro-batch on a cron
- **\`Trigger.ProcessingTime\`** — fire every N seconds or minutes: continuous
- **Checkpoint location** — the offsets already processed, so a restart resumes **exactly-once**`,
  narration:
    "Three ingestion patterns — batch, incremental, and streaming. Every source you will ever ingest falls into one of three shapes, and knowing which one you're looking at drives every later choice. Batch means the full dataset, every time. \"Here's all of yesterday's bank accounts, as one C-S-V.\" It's simple, but it gets expensive once the file is big, and it's wasteful when only one percent of the rows actually changed. Incremental means only the new or changed records since the last load. The source emits a continuous trail of new files, or it supports change-data-capture, or it has a monotonic column you can high-watermark on. Most production lakehouse ingestion lives right here. Streaming means records flow in continuously, and the target updates continuously too — within seconds to a few minutes. It's the same engine as incremental, Structured Streaming, just with a continuous trigger instead of a one-shot available-now. And there's some exam vocabulary you simply must own. Trigger-available-now — which used to be called trigger-once — means process whatever is there right now, then stop; that's your micro-batch-on-a-cron. Trigger-processing-time means fire every N seconds or minutes; that's continuous streaming. And the checkpoint location is where Structured Streaming records the offsets it has already processed, so that if a job restarts, it resumes exactly where it left off — that's what gives you exactly-once on the write path.",
}
