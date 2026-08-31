import type { Section } from '../types'

export const taskTypes: Section = {
  id: 'task-types',
  title: 'Task types — the four the exam names',
  scene: 'task-types',
  slide: `## Task types

Four come up directly, and for each you should know two things: **what it runs**, and **where it runs**.

- **Notebook** — an \`.ipynb\` from the Workspace or a Git Folder, on a **cluster** (job, all-purpose, or serverless)
- **SQL** — a saved query, alert, file, or dashboard, on a **SQL warehouse**. Four sub-variants; *query* is the common one
- **Pipeline** — a declarative pipeline (ex-DLT), on **pipeline-managed** compute
- **Dashboard** — refreshes an AI/BI dashboard, on a **SQL warehouse**

### Recognise these too
**JAR / Python script / wheel** (bundles, course 7) · **dbt** · **Run job** (nested) · **\`for_each\`** · **\`if/else\`**.

**Match the artifact to the task type.** "Refresh a dashboard" → the Dashboard task, not a notebook running SQL. "Run a pipeline" → the Pipeline task, which manages its own compute — you don't attach a cluster.`,
  narration:
    "Task types — the four the exam tests by name. Lakeflow Jobs supports a long list of task types, but four come up directly on the exam, and for each you should know two things: what it runs, and where it runs. The notebook task runs a notebook — a dot-i-p-y-n-b — from the Workspace or from a Git Folder, on a cluster, which can be a job cluster, an all-purpose cluster, or serverless. The S-Q-L task runs a saved query, alert, file, or dashboard, and it runs on a S-Q-L warehouse. The pipeline task runs a Lakeflow Spark Declarative Pipeline — the thing formerly called D-L-T — on pipeline compute that the pipeline itself manages. And the dashboard task refreshes an A-I-slash-B-I dashboard, also on a S-Q-L warehouse. One detail worth holding: the S-Q-L task actually has four sub-variants, mirroring D-B-S-Q-L's four artifact types — query, alert, file, and dashboard. The S-Q-L-task-query is the most common one you'll see. There's also a family of secondary task types to recognise. J-A-R, Python script, and Python wheel run code packaged outside notebooks — that's the Automation Bundle workflow we'll cover in module seven. There's dbt, to run a dbt project task. There's run-job, which runs another Lakeflow Job — nested composition. And there's for-each and if-else, for looping and branching, which we'll come to next. The exam's angle is simple: match the artifact to the task type. If the question says \"refresh a dashboard,\" the answer is the Dashboard task — not a notebook task that happens to run some S-Q-L. If it says \"run a pipeline,\" the answer is the Pipeline task, so the pipeline manages its own compute — you do not attach a cluster to it yourself.",
}
