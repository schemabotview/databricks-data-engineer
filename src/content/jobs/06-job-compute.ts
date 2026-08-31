import type { Section } from '../types'

export const jobComputeSection: Section = {
  id: 'job-compute',
  title: 'Compute for jobs — a per-task choice',
  scene: 'job-compute',
  slide: `## Compute for jobs

Something people miss: tasks within **one job** can each use **different** compute.

- **Job cluster** — created at task start, torn down at task end. **Cheapest DBU rate**, and the default for production ETL
- **Serverless (jobs)** — starts in seconds, no cluster management. Best for **short tasks**, where a three-minute classic startup is wasted overhead
- **All-purpose** — long-lived and shared. **Avoid for scheduled jobs**: higher rate, plus cross-job interference
- **SQL warehouse** — **required** for SQL and Dashboard tasks; serverless is the modern default

### The bank's nightly mix
\`ingest_cards\` → job cluster · \`silver_build\` → **the same cluster, reused** · \`refresh_dashboard\` → serverless SQL warehouse · \`notify\` → serverless jobs.

**Cluster reuse** shares one cluster across tasks so you pay the startup **once** — real money on a chain of small steps.

**Exam:** scheduled production ETL → job cluster or serverless. **Never all-purpose.**`,
  narration:
    "Compute for jobs — and the fact that it's a per-task choice. Here's something people miss: tasks within one job can each use different compute. There are four choices, so let's take them with \"when each wins.\" A job cluster is created at task start and torn down at task end. It has the cheapest D-B-U rate, and it's the default for production E-T-L. Serverless jobs compute starts in seconds with no cluster management, and it's best for short tasks where a three-minute classic cluster startup would be wasted overhead. An all-purpose cluster is long-lived and shared — and you should avoid it for scheduled jobs, because it has a higher D-B-U rate and a risk of cross-job interference. And a S-Q-L warehouse is required for S-Q-L and Dashboard tasks; the serverless S-Q-L warehouse is the modern default there. Look at the compute mix in the bank's nightly job. Ingest-cards, an Auto Loader notebook, runs on a job cluster. Silver-build, a heavy S-Q-L notebook, reuses that same job cluster. Refresh-dashboard, a Dashboard task, runs on a serverless S-Q-L warehouse. And notify, a tiny notebook, runs on serverless jobs compute. That \"reuses the same job cluster\" is worth pausing on. Cluster reuse across tasks is a setting on the cluster definition — several notebook tasks share one cluster and pay the startup cost only once. On a chain of small steps, that saves real money. And the exam's angle is crisp: for scheduled production E-T-L, pick a job cluster, or serverless — never an all-purpose cluster. All-purpose compute is for interactive development. Using it for a nightly job is both the wrong answer and the more expensive one.",
}
