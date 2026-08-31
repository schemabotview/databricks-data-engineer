import type { Section } from '../types'

export const runtimePhoton: Section = {
  id: 'runtime-photon',
  title: 'Databricks Runtime & Photon',
  scene: 'runtime-photon',
  slide: `## Databricks Runtime & Photon

### Databricks Runtime (DBR)
Every cluster boots a **DBR** — a pre-built image of tuned Apache Spark plus Delta Lake, optimized libraries, and the OS. Releases are **versioned** (e.g. DBR 15.x) and pin specific Spark and library versions, so environments are reproducible.

- Prefer an **LTS (long-term support)** release for production stability
- The **ML runtime** variant adds machine-learning libraries and GPU support

### Photon — the C++ query engine
Databricks' **vectorized** engine, a drop-in replacement for Spark's execution engine that accelerates **SQL and DataFrame** work — the same query runs faster and, finishing sooner, usually cheaper.

**Transparent to your code:** enable it on a supported cluster or warehouse and eligible operations run on the native engine — no rewrite.`,
  narration:
    "Databricks runtime and photon. Every cluster boots a databricks runtime, or D-B-R: a pre-built image of a tuned apache spark, plus optimized libraries, delta lake, and the operating system. Runtimes are versioned, for example D-B-R fifteen, and each release pins specific spark and library versions, so your environment is reproducible. For production, prefer a long-term support version, an L-T-S release, for stability. There are a few variants. The standard runtime covers data engineering. The machine learning runtime adds machine learning libraries and G-P-U support for training workloads. Photon is Databricks' vectorized query engine, written in C plus plus. It's a drop-in replacement for spark's execution engine that accelerates sequel and dataframe workloads. The same query runs faster, and because it finishes sooner, usually cheaper. Best of all, it's transparent to your code. You don't rewrite anything. You enable photon on a supported cluster or sequel warehouse, and eligible operations run on the native engine. For the exam: the D-B-R is the runtime image, that's spark plus delta plus libraries; pick an L-T-S release for production, and the machine learning runtime for training. Photon is the C plus plus vectorized engine that speeds up sequel and dataframe operations, with no code changes.",
}
