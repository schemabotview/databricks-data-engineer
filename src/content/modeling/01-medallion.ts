import type { Section } from '../types'

export const medallion: Section = {
  id: 'medallion',
  title: 'Medallion — what belongs in each layer',
  scene: 'medallion',
  slide: `## Medallion architecture

Three layers, each with one job. The exam tests one skill: read a description, name the layer.

### Bronze — raw, append-only, replayable
One table per source; the schema mirrors the source, nested structures fine. Strings and nulls allowed — quality is **not** enforced. Bronze is the **audit copy**: whatever the source sent, you kept.

### Silver — cleaned, conformed, deduplicated
**Same grain** as bronze (one row per event), but types pinned, nulls dropped, foreign keys conformed, and quality **enforced** with expectations or \`CHECK\`.

### Gold — business-ready, aggregated, served
Star schema or wide rollup, pre-aggregated, one row per **entity**. Permissions tightest — this is where analysts and ML join.

**The rule:** many **narrow** gold tables off the *same* silver — never one giant table.`,
  narration:
    "Medallion architecture — what actually belongs in each layer. Three layers, each with a single job, and the exam constantly tests one skill: reading a description and knowing which layer it belongs to. So let's make each layer's job crisp. Bronze is raw, append-only, and replayable. One table per source, the schema mirrors the source — nested structures are fine — and strings and nulls are allowed. Crucially, quality is not enforced at bronze. Think of bronze as your audit copy: whatever the source sent, you kept. Silver is cleaned, conformed, and deduplicated. It stays at the same grain as bronze — one row per event — but now types are pinned, nulls are dropped from required columns, foreign keys are conformed so customer-i-d is a string everywhere, and quality rules are enforced, with expectations or check constraints. Gold is business-ready, aggregated, and served. This is star schemas or wide rollups, ready for B-I and M-L. It's often pre-aggregated — daily, or customer-level — so you have one or more rows per business entity, not per event. And permissions are tightest here, because this is where analysts and consumers actually join. Now the rule the exam loves: you can have many gold tables driven by the same silver tables. The bank's customer-360, its daily-card-volume, and its fraud-features all read from the same silver card-transactions. So don't try to build one giant gold table — build many narrow ones, each shaped to its consumer. And that's what this whole module is about: the objects and the framework that build gold — plain tables and views, materialized views, streaming tables, and the declarative pipeline framework that ties them together with quality and lineage.",
}
