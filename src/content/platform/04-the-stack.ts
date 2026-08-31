import type { Section } from '../types'

export const theStack: Section = {
  id: 'the-stack',
  title: 'The platform stack at a glance',
  scene: 'platform-stack',
  slide: `## The platform stack

Four layers, each depending on the one below — from the base up.

1. **Cloud object storage** — S3, ADLS, or GCS: the cheap, durable base where your bytes actually sit
2. **Delta Lake** — the open table format that turns loose files into transactional tables: ACID, schema, time travel
3. **Unity Catalog** — governance that names, secures, and audits every table, file, and model through one **three-level namespace**
4. **Engines & workloads** — Spark, Photon, Databricks SQL, and Lakeflow ingestion, pipelines, and jobs — all reading *through* Unity Catalog to the same Delta tables

### The shape
Cheap open storage at the base, transactions and governance in the middle, every engine on top sharing **one copy** of the data.

Delta Lake and Unity Catalog get the deep dive in the next course.`,
  narration:
    "The platform stack at a glance. Zoom out, and the platform is a stack of four layers, each one depending on the layer below it. At the bottom is cloud object storage: S-three, A-D-L-S, or G-C-S. This is the cheap, durable place where your bytes actually sit. On top of storage sits delta lake. It's the open table format that turns loose files into transactional tables, with acid guarantees, schema, and time travel. Above delta sits unity catalog. It's the governance layer that names, secures, and audits every table, file, and model, through one three-level namespace. And on top run the engines and workloads: the spark and photon engines, databricks sequel, and lakeflow ingestion, pipelines, and jobs. All of them read through unity catalog to the same delta tables. You'll go deep on the two foundation layers, delta lake and unity catalog, in the next module. For now, the point is the shape: cheap open storage at the base, transactions and governance in the middle, and every engine on top sharing one copy of the data.",
}
