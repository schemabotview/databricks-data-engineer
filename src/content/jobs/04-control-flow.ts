import type { Section } from '../types'

export const controlFlow: Section = {
  id: 'control-flow',
  title: 'Control flow — if/else, for_each, retries',
  scene: 'control-flow',
  slide: `## Control flow

### \`if/else\` condition task
A task whose only job is to evaluate a boolean and **route the DAG**. Downstream tasks declare which branch they belong to — an \`is_friday\` check routes to \`run_fraud_rebuild\` if true, or straight to the dashboard if false. Branching, expressed as a task in the graph.

### \`for_each\`
Runs a child task **once per item** in an array, fanning the same notebook over many inputs — \`["cards","accounts","loans","payments"]\` runs it four times, **in parallel**. Each child gets its item as \`{{input}}\`.

### Retries — configured per task
\`max_retries\` · \`min_retry_interval_millis\` · \`retry_on_timeout\` · \`timeout_seconds\`.

**Exam:** a flaky upstream API failing ~1% of the time → **\`max_retries = 3\`**. Transient failures auto-recover; only persistent ones page a human. Note the distractors: not \`for_each\`, not a continuous trigger.`,
  narration:
    "Control flow — if-else, for-each, and retries. Three primitives the exam can plant a question on. First, the if-else condition task. This is a task whose only job is to evaluate a boolean expression and route the D-A-G based on the result. Downstream tasks then declare \"only run if my parent's branch was true.\" So you might have an is-friday check: if true, route to run-fraud-rebuild; if false, skip straight to the dashboard. It's branching, expressed as a task in the graph. Second, the for-each task. This runs a child task once per item in an array — it fans the same notebook out over many inputs. So with inputs of cards, accounts, loans, and payments, your child ingest notebook runs four times, once per vertical, and in parallel. The child receives one item per execution as a parameter — in templates that's the double-curly-brace input token. Third, retries, which are configured at the task level. Max-retries is how many times Databricks re-runs the task on failure. Min-retry-interval-millis is the minimum gap between attempts. Retry-on-timeout means also retry when the task times out, not only when it errors. And timeout-seconds kills the task if it runs longer than that limit. Here's the exam pattern to lock in. You've got a flaky upstream A-P-I that fails about one percent of the time. The right move is to set max-retries equals three on the ingest task. Then that transient failure just auto-retries and recovers, and only a persistent failure — one that fails all the attempts — actually pages a human. And note the distractors: do not reach for for-each, and do not reach for a continuous trigger, to solve retry. Retry is its own dedicated task setting, and that's the answer.",
}
