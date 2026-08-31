import type { Section } from '../types'

export const theWorkspace: Section = {
  id: 'the-workspace',
  title: 'The workspace — what you touch daily',
  scene: 'workspace',
  slide: `## The workspace

The browser environment where a data engineer works — everything you touch sits in the left sidebar.

1. **Notebooks** — the primary surface: write PySpark or SQL in cells, attach to compute, run
2. **Git folders & file tree** — your code under version control
3. **Catalog Explorer** — your window into Unity Catalog: catalogs, schemas, tables, volumes, lineage, permissions
4. **SQL editor** — ad-hoc queries against a SQL warehouse
5. **Lakeflow Jobs & pipelines** — orchestration and declarative pipelines
6. **Compute** — create and manage clusters and warehouses

### One level up: the account
An account holds **many workspaces**, and the Unity Catalog **metastore lives at the account level** — so governed data is shared across every workspace instead of being trapped in one.`,
  narration:
    "The workspace, and what a data engineer touches daily. The workspace is the browser environment where you get work done, and everything a data engineer touches sits in its left sidebar. Notebooks are the primary surface. You write pyspark or sequel in cells, attach the notebook to compute, and run. Alongside them, the workspace file tree and git folders keep your code under version control. Catalog explorer is your window into unity catalog. You browse catalogs, schemas, tables, and volumes, inspect schema and lineage, and manage permissions. The sequel editor runs ad-hoc queries against a sequel warehouse. Lakeflow jobs is where you orchestrate multi-step workflows. Lakeflow pipelines is where declarative pipelines live. And the compute page is where you create and manage clusters and warehouses. One level up from the workspace is the account. An account can hold many workspaces, and the unity catalog metastore lives at the account level. That means the same governed data is shared across every workspace, rather than being trapped in just one.",
}
