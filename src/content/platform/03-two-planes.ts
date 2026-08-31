import type { Section } from '../types'

export const twoPlanes: Section = {
  id: 'two-planes',
  title: 'Control plane vs. compute plane',
  scene: 'two-planes',
  slide: `## Control plane vs. compute plane

Every deployment splits in two — which tells you **where your code runs** and **where your data lives**.

### Control plane — managed by Databricks
Web UI · notebook and SQL editors · job scheduler · cluster manager · query history · **Unity Catalog metadata**. It holds **metadata and results**, never your bulk data.

### Compute plane — where data is processed
The clusters and SQL warehouses running Spark, in two flavors:

1. **Classic** — runs in *your* cloud account and network (VPC / VNet); data never leaves your account
2. **Serverless** — runs in Databricks' account, ready almost instantly, network managed for you

### The mental model for the exam
Notebooks, metadata and results live in the **control plane**; processing happens in the **compute plane**; **data at rest** stays in your own object storage.`,
  narration:
    "Control plane versus compute plane. Every Databricks deployment splits into two halves, and knowing which is which explains where your code runs and where your data lives. The control plane is managed by Databricks, in Databricks' own cloud account. It holds the web interface, the notebook and sequel editors, the job scheduler, the cluster manager, query history, and the unity catalog metadata. Think of it as the brains and the management services. It stores metadata and results, but not your bulk data. The compute plane is where your data is actually processed. It's the clusters and sequel warehouses running spark. It comes in two flavors. Classic compute runs in your cloud account, inside your own network. Your data never leaves your account, which suits stricter isolation requirements. Serverless compute runs in Databricks' account and is available almost instantly, with the network managed for you. You trade some network control for speed and zero cluster management. In both cases, your data at rest stays in your own cloud object storage. It never sits in the control plane. So the mental model for the exam is simple: notebooks, metadata, and results live in the control plane; data processing happens in the compute plane; and your data at rest lives in your own storage.",
}
