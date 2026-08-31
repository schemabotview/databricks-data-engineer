import type { Section } from '../types'

export const repairRerun: Section = {
  id: 'repair-rerun',
  title: 'Monitoring, repair & rerun',
  scene: 'repair-rerun',
  slide: `## Monitoring, repair & rerun

The Jobs UI is the exam's go-to for monitoring. Four things to know.

- **Run history** — every run with its state, duration, and a **duration sparkline**. This is where you spot **trends**: *"this job now takes twice as long as it did three months ago"*
- **Task graph** — one run's DAG coloured by state: 🔴 failed · ⚪ skipped · 🟢 succeeded. This is where you find the **upstream blocker** — if \`ingest_cards\` is red and everything downstream is grey, the root cause is obvious
- **Repair run** — reruns **only the failed tasks**, same parameters, same DAG. Cheaper and safer than starting over
- **Run dashboard / metrics** — success rate and p95 duration, for capacity and SLA tracking

### The patterns
*"Median duration tripled — where first?"* → run history for the trend, then the task graph for the offending task. *Late-stage failure in a 6-hour job* → **repair run**: re-execute the failed leaf, reuse the five good tasks.`,
  narration:
    "Monitoring, repair, and rerun. The Lakeflow Jobs U-I is the exam's go-to for monitoring questions, so there are four things to know. The run history view lists every run of a job, with its state, its duration, and — importantly — a sparkline of durations over time. You use it to spot trends. \"This job now takes twice as long as it did three months ago\" is a run-history observation. The task graph view shows the D-A-G for a single run, coloured by state: red is failed, grey is skipped, green is succeeded. You use it to find the upstream blocker. If ingest-cards is red, and silver-build and gold are both grey, you instantly know the root cause is ingest-cards — everything downstream was skipped because it failed. Repair run reruns only the failed tasks of a previous run, with the same parameters, in the same D-A-G. It's cheaper and safer than re-running the whole job from scratch. And the run dashboard, or Jobs metrics, gives you aggregate views — success rate, p95 duration — for capacity planning and S-L-A tracking. Here's the exam's monitoring pattern. A job's median duration tripled overnight — where do you look first? You go to the run history view to confirm the trend, then open the task graph view of a slow run to find the offending task. From there, module eight takes you deeper, into Spark-level diagnostics. And finally, why repair beats rerun. Imagine a six-hour job where only the very last task failed. Re-running the whole job wastes five successful tasks and six hours. A repair run re-executes just that failed leaf, reusing all the upstream results. That's the answer whenever a question asks how to recover from a late-stage failure efficiently.",
}
