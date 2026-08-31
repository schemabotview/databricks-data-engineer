import type { Section } from '../types'

export const whatIsAJob: Section = {
  id: 'what-is-a-job',
  title: 'What is a Lakeflow Job?',
  scene: 'job-anatomy',
  slide: `## What is a Lakeflow Job?

Three nested concepts — get this vocabulary right and the rest of the course falls into place.

- **Job** — the unit of orchestration: a named, version-controlled definition of *what to run and when*
- **Task** — one step inside it: a notebook, SQL query, pipeline, or dashboard refresh
- **Run** — a single execution. Every run carries a state: pending · running · **succeeded** · **failed** · cancelled · skipped

### Rename watch
**Lakeflow Jobs** is current. **Databricks Workflows** and **Databricks Jobs** are legacy names for exactly the same thing — a question may use any of the three.

### Single vs. multi-task
The exam mostly tests **multi-task DAGs**, because that's what real ETL looks like: ingest several sources in parallel → build silver → refresh gold → fire a dashboard → notify.`,
  narration:
    "What is a Lakeflow Job? Start with three nested concepts, because if you get this vocabulary right, everything else in the module just falls into place. A job is the unit of orchestration — a named, version-controlled definition of what to run and when. The bank runs one nightly job per business unit. A task is one step inside a job — a notebook, a S-Q-L query, a pipeline, a dashboard refresh, and so on. A job is either a single task, or many tasks wired together into a D-A-G. And a run is a single execution. You'd say \"the job had fifty runs last month, and forty-nine succeeded.\" Every run carries a state — pending, running, succeeded, failed, cancelled, or skipped. Now a quick rename watch, because the exam plays with names. Lakeflow Jobs is the current name. Databricks Workflows and Databricks Jobs are the legacy names, and a question may use any of the three to mean exactly this same thing. There's also single-task versus multi-task. A one-task job is perfectly fine for trivial work. But the exam mostly tests multi-task jobs — a D-A-G of dependent tasks — because that's what real E-T-L actually looks like: you ingest several sources in parallel, build silver, refresh gold, fire a dashboard, and notify at the end. And that's exactly our worked example for the module: the bank's nightly job, called fintech-nightly-ingest. It ingests the daily card, account, and loan drops, runs the silver transformations, refreshes customer-360, fires the B-I dashboard, and emails ops on failure. We'll build up every piece of that job as we go.",
}
