import type { Scene } from '../../render-engine'

// §7 and §10 — the jobs code block. §7 is Python; §10 is YAML, where `#` is also the native comment,
// so both read naturally. Lines stay at or under CODE_MIN_COLS (76).

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeParameters = code(
  'code-parameters',
  'parameters.py',
  `# Three ways tasks share state. The trick is knowing which fits.

# 1. JOB PARAMETER -- job-level, visible to EVERY task.
#    For something the whole job shares, like the run's date.
processing_date = dbutils.widgets.get("processing_date")

# 2. TASK VALUE -- one task sets it, a downstream task reads it.
#    For something one task COMPUTES and the next consumes.
dbutils.jobs.taskValues.set(key="new_file_count", value=42)

count = dbutils.jobs.taskValues.get(
    taskKey="ingest_cards", key="new_file_count")

# 3. BUILT-IN REFERENCES -- template tokens in any task param:
#      {{job.run_id}}                  this run's id
#      {{job.start_time.iso_date}}     the run's start date
#      {{tasks.<key>.values.<k>}}      an upstream task value
#      {{job.parameters.<p>}}          a job-level parameter

# EXAM: pass a date or a count between tasks WITHOUT a side
# table. Shared date -> job parameter. Computed value -> task
# value. The wrong answer is a temp table to shuttle one number;
# task values exist precisely so you don't need it.`,
)

export const codeJobYaml = code(
  'code-job-yaml',
  'databricks.yml',
  `# Three ways to define a job: the UI (one-offs), the REST API
# (POST /api/2.1/jobs/create), and YAML in an Automation Bundle
# -- the production pattern, version-controlled, dev -> prod.
# Read the STRUCTURE here, not the syntax.

resources:
  jobs:
    fintech_nightly_ingest:
      schedule:
        quartz_cron_expression: "0 0 2 * * ?"   # daily 02:00
        timezone_id: UTC
      email_notifications:
        on_failure: [oncall@bank.example]
      tasks:
        - task_key: ingest_cards
          notebook_task:
            notebook_path: ../notebooks/ingest_cards.ipynb
          job_cluster_key: shared_etl_cluster
          max_retries: 3
        - task_key: notify
          depends_on: [{ task_key: ingest_cards }]
          run_if: ALL_DONE            # fires either way

# Everything in this course is in that shape:
#   the DAG      -> depends_on
#   the trigger  -> schedule
#   the retries  -> max_retries
#   always fires -> run_if: ALL_DONE      ...and course 7 ships it.`,
)
