import type { Section } from '../types'

export const clusters: Section = {
  id: 'clusters',
  title: 'Clusters — all-purpose vs. job',
  scene: 'clusters',
  slide: `## Clusters — all-purpose vs. job

A **cluster** is a set of cloud VMs running Spark together: one **driver** that coordinates and one or more **workers** that do the parallel work.

### All-purpose — interactive
Created by hand, notebooks attached, stays up while you explore; multiple users share it. For **dev, ad-hoc analysis, and debugging** — bills at a **higher DBU rate**.

### Job — ephemeral
A Lakeflow Job creates one when a run starts and tears it down the moment it finishes. Each run gets a fresh, single-purpose cluster, so runs are **isolated**, at a **lower DBU rate**. For **scheduled production ETL**.

### Rule of thumb
Dev and exploration → all-purpose; scheduled production → job. Running production on an all-purpose cluster is a classic anti-pattern: it costs more and loses per-run isolation.`,
  narration:
    "Clusters, all-purpose versus job. A cluster is a set of cloud V-Ms running spark together: one driver that coordinates, and one or more workers that do the parallel work. Databricks gives you two kinds, and the exam leans on the difference between them. All-purpose clusters are interactive. You create one by hand, attach notebooks to it, and it stays up while you explore. Multiple users can share it. This is the compute for development, ad-hoc analysis, and debugging. Because it lingers and serves interactive work, it bills at a higher rate. Job clusters are ephemeral. A lakeflow job creates one automatically when a run starts, and tears it down the moment the run finishes. Each run gets a fresh, single-purpose cluster, so runs are isolated from each other, and the rate is lower. This is the compute for scheduled, automated production pipelines. The rule of thumb is simple: development and exploration go on all-purpose clusters; scheduled production goes on job clusters. Running a production job on an all-purpose cluster is a classic anti-pattern. It costs more, and it loses the per-run isolation that a job cluster gives you.",
}
