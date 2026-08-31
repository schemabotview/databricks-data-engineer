import type { Section } from '../types'

export const resources: Section = {
  id: 'resources',
  title: 'Resources — jobs, pipelines & more',
  scene: 'code-resources',
  slide: `## Resources

The insight that makes this easy: **each resource schema mirrors the corresponding REST API.** A job in a bundle uses the very same fields you'd send to \`POST /api/2.1/jobs/create\` back in course 6.

**So the YAML you learned to *read* there is exactly the YAML you *author* here** — nothing new about the job shape, you're just writing it down as code.

### Parametrisation is the point
\`\${var.catalog}\` and \`\${bundle.target}\` flow from the manifest into every resource. A pipeline named \`card_etl_\${bundle.target}\` targeting \`\${var.catalog}.gold\` automatically reflects whichever target you deploy to.

### What a bundle can define
**Jobs · pipelines · ML experiments and models · dashboards · volumes · schemas** — each keyed under \`resources\` by type.

Split them into **\`resources/*.yml\`** via \`include\` as the project grows; don't cram everything into one manifest.`,
  narration:
    "Resources — jobs, pipelines, and the other objects a bundle manages. Here's the key insight that makes this section easy: each resource type has a schema that mirrors the corresponding Databricks R-E-S-T A-P-I. A job in a bundle uses the very same fields you'd send to post-slash-api-2.1-slash-jobs-slash-create back in module six. So the Y-A-M-L you learned to read there is exactly the Y-A-M-L you author here. Nothing new to learn about the job shape — you're just writing it down as code. Look at resources-slash-job-nightly-dot-y-m-l. Under resources, jobs, you define fintech-nightly-ingest — with a schedule, failure notifications, a tasks list, and a job-clusters block. And notice the parametrisation: the notebook task passes base-parameters catalog equals dollar-brace-var-dot-catalog, and the cluster's node-type-id is dollar-brace-var-dot-node-type-id. Those values come from the manifest. Then resources-slash-pipeline-card-etl-dot-y-m-l defines a declarative pipeline under resources, pipelines. Its name is card-etl-dollar-brace-bundle-dot-target, and its target is dollar-brace-var-dot-catalog-dot-gold. So the pipeline's name and destination automatically reflect whichever target you deploy to. Those dollar-brace references — var-dot-catalog and bundle-dot-target — are the whole point: values flow from the manifest into every resource. Finally, what a bundle can define: jobs, pipelines, M-L experiments and models, dashboards, volumes, and schemas — each keyed under resources by its type. And a practical tip: splitting these into separate resources-slash-star-dot-y-m-l files, pulled in with include, keeps the manifest readable as the project grows. You don't cram everything into one giant databricks-dot-y-m-l.",
}
