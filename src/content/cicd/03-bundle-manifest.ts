import type { Section } from '../types'

export const bundleManifest: Section = {
  id: 'bundle-manifest',
  title: 'Asset Bundles — the databricks.yml',
  scene: 'code-databricks-yml',
  slide: `## The \`databricks.yml\` manifest

**Names first:** Automation Bundles were originally **Databricks Asset Bundles (DABs)**; you'll also see **Declarative Automation Bundles**. All the same thing — a way to package every Databricks resource in a project **as code**.

A bundle has a root manifest, resource definitions, source files, named **targets**, and **variables** parametrised per target.

### Three concepts to recognise
- **Variables** — one declaration, target-specific values, referenced as \`\${var.catalog}\`
- **Targets** — named deployments, each with its own workspace, identity, and overrides
- **Mode** — \`development\` keeps the cluster alive and prefixes resource names; \`production\` terminates it and uses exact names. **Prod should always be \`production\` mode, run as a service principal**

**The exam asks this flatly:** the entry point is **\`databricks.yml\`** — not \`bundle.json\`, not \`pyproject.toml\`.`,
  narration:
    "Databricks Asset Bundles — and the databricks-dot-y-m-l manifest at their heart. First, the names, because there are several. Automation Bundles were originally called Databricks Asset Bundles, or D-A-Bs, and you'll also see Declarative Automation Bundles. All the same thing: a way to package every Databricks resource in your project as code. A bundle has a root databricks-dot-y-m-l manifest, resource definitions like jobs and pipelines, source files like notebooks and Python, named targets — dev, test, prod — and variables that you parametrise per target. Now the manifest itself. It has three key top-level sections: bundle, resources — usually pulled in through an include of your resources folder — and targets. In the example, the bundle is named fintech-platform. There's a variables block declaring catalog and node-type-id with defaults. And there's a targets block: dev runs in development mode against the dev workspace with catalog fintech-dev; prod runs in production mode against the prod workspace, runs as a service principal, and overrides catalog to fintech-prod and the node type to a bigger one. Three concepts to recognise from that. Variables — a single declaration with target-specific values, which you pass into resources using dollar-brace-var-dot-catalog. Targets — named deployments, each with its own workspace, identity, and variable overrides. And mode — development means the cluster stays alive and resource names get a username prefix, while production means the cluster terminates and names are exact. Prod targets should always be mode production, and run as a service principal. And there's one file question the exam likes to ask flatly: the entry point of a bundle is databricks-dot-y-m-l. Not bundle-dot-json, not pyproject-dot-toml. Databricks-dot-y-m-l.",
}
