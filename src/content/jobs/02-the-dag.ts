import type { Section } from '../types'

export const theDag: Section = {
  id: 'the-dag',
  title: 'The DAG — tasks & dependencies',
  scene: 'job-dag',
  slide: `## The DAG

Tasks declare which other tasks must succeed before them. Lakeflow builds a **directed acyclic graph** from those declarations, runs it in topological order, and **parallelises wherever it can**.

In the bank's nightly job, \`ingest_cards\`, \`ingest_accounts\` and \`ingest_loans\` run **in parallel** — none depends on the others. \`silver_build\` lists all three as upstream, so it waits for all three.

### Three settings the exam tests
- **\`depends_on\`** — the upstream task keys. Empty makes it a **root** task
- **\`run_if\`** — \`ALL_SUCCESS\` (default) · \`AT_LEAST_ONE_SUCCESS\` · \`NONE_FAILED\` · **\`ALL_DONE\`** · … Use **\`ALL_DONE\`** to wire a final notification that fires whether upstream succeeded or failed
- **\`max_retries\`** — re-attempts on failure, with exponential backoff

**Declare dependencies, not order** — that's what makes a job self-parallelising.`,
  narration:
    "The D-A-G — tasks and dependencies. Here's the core idea: tasks declare which other tasks must succeed before them. Lakeflow Jobs takes those declarations, builds a directed acyclic graph — a D-A-G — and then runs the tasks in topological order, parallelising wherever it possibly can. Picture the bank's nightly job. Three ingest tasks — cards, accounts, and loans — all run in parallel, because none of them depends on the others. Then silver-build lists all three as upstream, so it waits until all three succeed before it runs. After that, gold-customer-360, then refresh-dashboard, and finally notify, which runs unconditionally at the end no matter what happened before it. There are three task settings the exam tests, so let's name them. Depends-on is the list of upstream task keys; an empty depends-on makes a root task, one with nothing before it. Run-if controls when a task should run given the upstream outcomes — the options are all-success, which is the default, at-least-one-success, none-failed, all-done, at-least-one-failed, and all-failed. And the one to really remember: all-done is how you wire a final notification task that always fires, whether the upstream succeeded or failed. And max-retries is how many times to re-attempt the task on failure, with exponential backoff between attempts. The reason the D-A-G matters so much is that it makes a job self-parallelising. You declare dependencies, not an explicit order — and the scheduler works out, on its own, which tasks can safely run at the same time. That's the whole payoff of describing your pipeline as a graph instead of a script.",
}
