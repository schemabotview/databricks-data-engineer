# databricks-data-engineer — GraphL concept repo

The **Databricks Certified Data Engineer Associate** concept app for [GraphL](https://graphl.in).
One section = a left **scene** (react-flow diagram or code snippet) + a right **slide** (markdown) +
a **narration** script, rendered responsively (4K capture · laptop web app · mobile) and captured to
video.

Workspace-wide model, pipeline, and conventions: see the workspace [`README.md`](../README.md).

## The course arc (9 courses)

Played in syllabus order (`→` past the end of one rolls into the next). Per-section spine:
[`COURSE-PLAN.md`](./COURSE-PLAN.md).

| # | Course | What it covers |
|--:|--------|----------------|
| 1 | **platform** | The Data Intelligence Platform: control vs. compute plane, the workspace, clusters, DBUs, Photon. |
| 2 | **delta-uc** | Delta Lake and Unity Catalog: the transaction log, time travel, MERGE, the three-level namespace. |
| 3 | **ingestion** | Getting data in: COPY INTO, Auto Loader, Lakeflow Connect, federation — and when to pick each. |
| 4 | **transformations** | PySpark and Spark SQL: cleaning, joins, explode, aggregates, window functions, writing to silver. |
| 5 | **modeling** | Medallion, materialized views, streaming tables, declarative pipelines, expectations, CDC. |
| 6 | **jobs** | Lakeflow Jobs: the DAG, task types, control flow, triggers, parameters, repair & rerun. |
| 7 | **cicd** | Git folders, Databricks Asset Bundles, the CLI, and promotion dev → test → prod. |
| 8 | **troubleshooting** | Reading the Spark UI; skew, shuffle, spill, AQE, out-of-memory and the fix patterns. |
| 9 | **governance** | Unity Catalog access control: privileges, GRANT/REVOKE, masking, row filters, ABAC, audit. |

## Layout

```
src/
  render-engine/   layout + react-flow / code-snippet renderer (folder, not a package)
  scenes/          hand-authored scenes + registry
  content/         courses → sections (one file per section) + registry
  section/         composited scene-left / slide-right view (responsive)
  App.tsx          hash router — section (whole-scene) view · scene (individual) view
scripts/
  record-course.mjs / record-reels.mjs   capture → mp4 (landscape / portrait)
  thumb.mjs / gen-descriptions.mjs        thumbnails / video descriptions
  colab_generate_audio.ipynb              Colab + Chatterbox TTS → .wav
```

## Run

```bash
npm install
npm run dev                    # open the printed URL, try #/platform
npm run build                  # vite build (must stay clean)
npx tsc --noEmit               # typecheck (must stay clean)
npm run record platform        # 4K video → scripts/out/platform.mp4
npm run record:reels platform  # portrait reels
```

## Status

**All 9 courses complete** — 90 sections, 90 scenes (63 diagrams + 27 code cards), 90 narration wavs
totalling **2 hours 11 minutes**. `npm run build`, `npx tsc --noEmit` and `npm run check` are clean.

Remaining downstream work: regenerate `scripts/audio-manifest.json`, then record with
`npm run record <course>`.

`npm run check` guards the two render budgets that fail silently rather than at build time — see
[`CLAUDE.md`](./CLAUDE.md).
