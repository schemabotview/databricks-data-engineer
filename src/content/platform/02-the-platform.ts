import type { Section } from '../types'

export const thePlatform: Section = {
  id: 'the-platform',
  title: 'What the Data Intelligence Platform is',
  scene: 'platform-pillars',
  slide: `## What the platform is

The productized lakehouse — one place where data engineering, SQL, streaming, data science, and ML all run against a **single governed copy** of data.

### Built in three layers

1. **Open lakehouse foundation** — Delta tables on *your own* cloud object storage, in open formats, so **any engine can read them**
2. **Unified governance** — Unity Catalog governs every table, file, model, and dashboard through one permission model across all workspaces — not a separate ACL system per tool
3. **Data intelligence engine** — generative AI that reads your data's *semantics*: natural-language search, auto-optimization, smart defaults

### The payoff
One platform, one copy, every workload — instead of stitching a warehouse, lake, streaming system, and ML platform together.

Renamed from **Lakehouse Platform** to **Data Intelligence Platform** to reflect that AI layer.`,
  narration:
    "What the Data Intelligence Platform is. The Databricks Data Intelligence Platform is the productized lakehouse. It's one place where data engineering, sequel analytics, streaming, data science, and machine learning all run against a single governed copy of data. It's built in three layers. First, an open lakehouse foundation. Your data lives as delta lake tables on your own cloud object storage, in open formats, so no vendor locks the bytes away and any engine can read them. Second, unified governance. Unity catalog governs every table, file, model, and dashboard through one permission model that spans all of your workspaces and clouds, instead of a separate access control system for each tool. Third, and this is what puts the word intelligence in the name, a data intelligence engine. It uses generative AI to understand the meaning of your data, and that powers natural-language search, automatic optimization, and smart defaults, so more people can use the platform without deep tuning. The payoff is one platform, one copy of data, every workload and every persona, instead of stitching together a warehouse, a lake, a streaming system, and a machine learning platform and copying data between them. One naming note: Databricks recently renamed this from the Lakehouse Platform to the Data Intelligence Platform, to reflect that new AI layer.",
}
