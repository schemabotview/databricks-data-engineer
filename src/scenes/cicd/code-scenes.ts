import type { Scene } from '../../render-engine'

// §3–§6 — the bundle code block, the densest run after delta-uc's SQL. YAML and bash both use `#` as
// the native comment, so the commentary reads inline. Lines stay at or under CODE_MIN_COLS (76).

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeDatabricksYml = code(
  'code-databricks-yml',
  'databricks.yml',
  `# THE ENTRY POINT of a bundle is databricks.yml.
# Not bundle.json. Not pyproject.toml. The exam asks this flatly.

bundle:
  name: fintech-platform

variables:                       # declared ONCE, valued per target
  catalog:      { default: fintech_dev }
  node_type_id: { default: i3.xlarge }

include:
  - resources/*.yml              # keeps the manifest readable

targets:
  dev:
    mode: development            # cluster stays alive,
    default: true                # resource names get a prefix
    workspace: { host: https://dev.cloud.databricks.com }

  prod:
    mode: production             # cluster terminates,
    workspace: { host: https://prod.cloud.databricks.com }
    run_as:
      service_principal_name: fintech-platform-sp
    variables:
      catalog:      fintech_prod
      node_type_id: i3.2xlarge`,
)

export const codeResources = code(
  'code-resources',
  'resources.yml',
  `# Each resource schema MIRRORS the REST API. The job YAML you
# learned to READ in course 6 is the YAML you AUTHOR here --
# nothing new about the job shape, you just write it down.

resources:
  jobs:
    fintech_nightly_ingest:
      schedule:
        quartz_cron_expression: "0 0 2 * * ?"
      tasks:
        - task_key: ingest_cards
          notebook_task:
            notebook_path: ../notebooks/ingest_cards.ipynb
            base_parameters:
              catalog: \${var.catalog}        # from the manifest
          job_cluster_key: shared_etl_cluster

  pipelines:
    card_etl:
      name:   card_etl_\${bundle.target}     # dev / test / prod
      target: \${var.catalog}.gold

# \${var.*} and \${bundle.target} flow from the manifest into every
# resource -- so a pipeline's NAME and DESTINATION follow the
# target you deploy to, automatically.

# A bundle can define: jobs, pipelines, ML models and experiments,
# dashboards, volumes, and schemas.`,
)

export const codeVariables = code(
  'code-variables',
  'targets.yml',
  `# The payoff of the whole model: ONE codebase, three behaviours.
# The mechanism is just variable resolution per target.

#   variable       dev            test           prod
#   ------------------------------------------------------------
#   catalog        fintech_dev    fintech_test   fintech_prod
#   node_type_id   i3.xlarge      i3.xlarge      i3.2xlarge
#   mode           development    development    production
#   run_as         developer      developer      service principal
#   schedule       every 4h       every 4h       nightly 02:00

targets:
  prod:
    mode: production
    variables:
      catalog: fintech_prod
    resources:                   # override ANY resource field,
      jobs:                      # not only declared variables --
        fintech_nightly_ingest:  # this is the escape hatch
          schedule:
            quartz_cron_expression: "0 0 2 * * ?"

# The STRUCTURE -- the DAG, the tasks, the pipeline -- is written
# once. Only the values that must differ vary per target.
# You never fork the code per environment.`,
)

export const codeCli = code(
  'code-cli',
  'deploy.sh',
  `# Four subcommands cover the entire bundle workflow.

# 1. VALIDATE -- parse the manifest, resolve variables for the
#    target, check references, emit the JSON it WOULD send.
#    The dry run / lint. Run it on every pull request.
databricks bundle validate -t dev

# 2. DEPLOY -- upload source files, then create or update every
#    resource so the workspace MATCHES the manifest.
#    Idempotent: re-deploying an unchanged bundle is a no-op.
databricks bundle deploy -t dev

# 3. RUN -- a one-off run of one job or pipeline, tailing output.
#    The CLI equivalent of clicking "Run now".
databricks bundle run fintech_nightly_ingest -t dev

# 4. DESTROY -- remove every resource the bundle owns. Careful --
#    but exactly right for tearing down an ephemeral test env.
databricks bundle destroy -t test

# AUTH: OAuth user login (local) | OAuth M2M service principal
# (CI, via DATABRICKS_CLIENT_ID/SECRET) | PAT (legacy).

# EXAM: "parses the manifest, resolves variables, emits the JSON"
#       -> validate. Not deploy, not init, not run.`,
)
