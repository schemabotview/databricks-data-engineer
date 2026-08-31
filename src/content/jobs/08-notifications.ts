import type { Section } from '../types'

export const notifications: Section = {
  id: 'notifications',
  title: 'Notifications & operational hooks',
  scene: 'notifications',
  slide: `## Notifications & hooks

Four ways a job talks to humans and systems.

- **Email** — on start, success, failure, a duration warning, or a streaming backlog. Job-level, and often enough for low-stakes work
- **Webhooks / system destinations** — Slack, Teams, PagerDuty, or a generic HTTP endpoint. The right answer whenever a question mentions **paging on-call**
- **Run-as identity** — a user or a **service principal**; that identity governs which UC permissions apply
- **Always-run task** — \`run_if: ALL_DONE\` fires whether upstream succeeded or failed

### Two exam tells
*"Page the on-call team on failure"* → **webhook**, not just email. *"A production job shouldn't depend on one engineer's credentials"* → **run as a service principal**, so it survives that person leaving.

Two ways to guarantee a failure alert: a job-level \`on_failure\` hook, or an \`ALL_DONE\` task — which can also **do work**, not merely send a message.`,
  narration:
    "Notifications and operational hooks — how a job talks to humans and systems when things happen. There are four hooks. Email notifications fire on start, success, failure, a duration warning, or a streaming backlog, and they're configured at the job level. Simple, and often enough for low-stakes jobs. Webhooks, also called system destinations, send to Slack, Microsoft Teams, PagerDuty, or a generic H-T-T-P endpoint. This is the right answer whenever the question mentions paging the on-call team — email alone usually isn't what they're after. Run-as identity is the third. A job runs as a user or as a service principal, and that identity governs which Unity Catalog permissions apply to the job. The rule: production jobs should run as a service principal, not a human's personal account — so the job keeps working when that person leaves the team or loses access. And fourth, the always-run-on-finish task. You wire a final task with run-if equals all-done, and it fires whether the upstream succeeded or failed. The bank uses exactly this to push a summary status to Slack after every nightly run. Two exam tells to carry away. When the question says \"page the on-call team on failure,\" reach for a webhook or system destination — Slack or PagerDuty — not just email. And when it says \"a production job should not depend on one engineer's credentials,\" the answer is: run it as a service principal. One last thing worth noticing. There are two ways to guarantee a notification fires on failure: a job-level on-failure email or webhook, or a final all-done task. The all-done task has a bonus — it can actually do work, like writing a summary or updating a status table, not merely send a message.",
}
