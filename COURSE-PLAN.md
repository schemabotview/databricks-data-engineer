# COURSE-PLAN — databricks-data-engineer

**Status: COMPLETE 2026-08-31.** All 9 courses / 90 sections / 90 scenes / 90 wavs authored and
building clean — 130.6 minutes of narration, 63 diagrams and 27 code cards. The section spine below
is what shipped.

**Status when planned: APPROVED 2026-08-30.** 9 courses · 90 sections · no capstone. Content ports from the `-ct`
repo rather than being re-authored; the 90 generated wavs are committed to this repo; the shortened
section slugs below are confirmed. The three verdicts are argued from the May 2026 exam guide and a
coverage audit of the existing content — see the Verdict sections below.

Slice 0 (scaffold) is done. Slices 1–9 author one course each, in arc order.

**Final:** `platform` (10) · `delta-uc` (10) · `ingestion` (11) · `transformations` (11) ·
`modeling` (10) · `jobs` (10) · `cicd` (9) · `troubleshooting` (10) · `governance` (9) =
**90 sections · 90 scenes · 90 wavs · 130.6 min.** The 63/27 diagram-to-code split matched the plan
exactly. Every section has its own scene; no sharing anywhere — the two shared bookends the plan
predicted both turned out to be genuine decision sheets that earned their own board.

Remaining downstream work (not started): regenerate `scripts/audio-manifest.json`, then record.

Two conventions were settled during slice 1 and apply to every slice after it: slides are **enriched
from the section's `-ct` notebook** up to the budget rather than copied verbatim from the terse
`-ct` slide, and `npm run check` gates the two render budgets (see the repo `CLAUDE.md`).

## Where this comes from

`~/Workspace/databricks-data-engineer-ct` — 9 modules / 90 sections, already refined for the video
target and aligned to the *Databricks Certified Data Engineer Associate* exam guide. That repo also
holds, per section, a written `.slide`, a written `.tts`, and a **generated `.wav`** (131 minutes of
Chatterbox narration across the 90 sections, ~87s average). Keeping its spine is what makes that
prose and audio reusable — see "What ports, what gets authored fresh" below.

Course ids are shortened from the `-ct` module ids to read well in the slug (`#/<course>-<section>`)
and the eyebrow.

## The arc

| # | Course id | Title | Sections | Diagram / code |
|--:|-----------|-------|---------:|---------------|
| 1 | `platform` | Data Intelligence Platform & Compute | 10 | 10 D / 0 C |
| 2 | `delta-uc` | Delta Lake & Unity Catalog Foundations | 10 | 6 D / 4 C |
| 3 | `ingestion` | Data Ingestion | 11 | 8 D / 3 C |
| 4 | `transformations` | Transformations with PySpark & Spark SQL | 11 | 4 D / 7 C |
| 5 | `modeling` | Medallion, MVs, Streaming Tables & Declarative Pipelines | 10 | 7 D / 3 C |
| 6 | `jobs` | Lakeflow Jobs — Orchestration & Control Flow | 10 | 8 D / 2 C |
| 7 | `cicd` | Git Folders, Asset Bundles & the CLI | 9 | 5 D / 4 C |
| 8 | `troubleshooting` | Troubleshooting, Monitoring & Optimization | 10 | 10 D / 0 C |
| 9 | `governance` | Governance & Security | 9 | 5 D / 4 C |
| | | **Total** | **90** | **63 D / 27 C** |

`D` = a react-flow diagram scene · `C` = a `kind: 'code'` IDE card (SQL or PySpark). The split follows
the same rule `../python` and `../apache-spark` settled on: a diagram when the section teaches a
*structure or a decision*, a code card when it teaches *syntax you would type*.

---

## 1 · `platform` — Data Intelligence Platform & Compute (10)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `why-the-lakehouse` | Why the lakehouse | `lakehouse-evolution` | D |
| 2 | `the-platform` | What the Data Intelligence Platform is | `platform-pillars` | D |
| 3 | `two-planes` | Control plane vs. compute plane | `two-planes` | D |
| 4 | `the-stack` | The platform stack at a glance | `platform-stack` | D |
| 5 | `the-workspace` | The workspace — what you touch daily | `workspace` | D |
| 6 | `clusters` | Clusters — all-purpose vs. job | `clusters` | D |
| 7 | `sql-warehouses` | SQL warehouses & serverless | `sql-warehouses` | D |
| 8 | `choosing-compute` | Choosing compute — four scenarios | `compute-decision` | D |
| 9 | `cost-model` | DBUs, autoscaling, auto-termination | `cost-model` | D |
| 10 | `runtime-photon` | Databricks Runtime & Photon | `runtime-photon` | D |

**10 scenes.** §2 and §4 were planned to share one `platform-map`, but they are the two different
cuts that justify keeping both sections — §2 is the product framing (three pillars, including the AI
engine), §4 the technical dependency stack. With no camera or dim in this engine, one scene cannot
say both, so they split into `platform-pillars` and `platform-stack`. (▲ marks a shared scene
elsewhere in this plan; this course now has none.)

## 2 · `delta-uc` — Delta Lake & Unity Catalog Foundations (10)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `why-delta` | What raw Parquet doesn't give you | `delta-vs-parquet` | D |
| 2 | `transaction-log` | The transaction log & ACID | `delta-log` | D |
| 3 | `time-travel` | Querying an old version | `code-time-travel` | C |
| 4 | `schema` | Schema enforcement & evolution | `code-schema` | C |
| 5 | `merge` | MERGE INTO, UPDATE, DELETE | `code-merge` | C |
| 6 | `maintenance` | OPTIMIZE, ZORDER, VACUUM | `code-maintenance` | C |
| 7 | `liquid-clustering` | Liquid Clustering | `liquid-clustering` | D |
| 8 | `uc-namespace` | Unity Catalog & the three-level namespace | `uc-namespace` | D |
| 9 | `managed-vs-external` | Managed vs. external tables | `managed-vs-external` | D |
| 10 | `volumes` | Volumes — governed storage for files | `volumes` | D |

**10 scenes.** §3–§6 are the SQL block — four code cards in a row, the densest run in the concept.
Two code-card house rules found here: keep every source line at or under `CODE_MIN_COLS` (76) — a
wider card renders its type smaller once fitView scales the scene — and never set `sub` on a SQL
card, since `codeLines` appends it as a `#` comment. Commentary goes inline as `--`.

## 3 · `ingestion` — Data Ingestion (11)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `three-patterns` | Batch, incremental, streaming | `ingestion-patterns` ▲ | D |
| 2 | `copy-into` | COPY INTO — idempotent, pure SQL | `code-copy-into` | C |
| 3 | `auto-loader` | Auto Loader — cloudFiles | `auto-loader` | D |
| 4 | `listing-vs-notification` | Directory listing vs. file notification | `auto-loader-modes` | D |
| 5 | `schema-evolution` | Schema inference & evolution modes | `code-cloudfiles-schema` | C |
| 6 | `copy-into-vs-auto-loader` | When each wins | `ingestion-compare` | D |
| 7 | `lakeflow-connect` | Lakeflow Connect & managed connectors | `lakeflow-connect` | D |
| 8 | `other-inbound` | Partner connectors, JDBC, REST | `inbound-paths` | D |
| 9 | `nested-json` | Semi-structured & nested data | `code-nested-json` | C |
| 10 | `federation` | Lakehouse Federation — not ingesting at all | `federation` | D |
| 11 | `decision-sheet` | Pick the right ingestion path | `ingestion-decision` | D |

**11 scenes.** §11 was planned to re-ride `ingestion-patterns` as a bookend, but its content is a
ten-row decision table — different work from §1's "three shapes" — so it got its own
`ingestion-decision`, built like the platform course's `compute-decision`. Concept budget 88 → 89.

## 4 · `transformations` — PySpark & Spark SQL (11)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `bronze-to-silver` | What changes between layers | `bronze-to-silver` | D |
| 2 | `cleaning` | Nulls, types, casting | `code-cleaning` | C |
| 3 | `column-row-ops` | select, withColumn, filter, dedup | `code-column-row` | C |
| 4 | `joins` | The seven join types | `join-types` | D |
| 5 | `broadcast-joins` | Broadcast joins & join performance | `broadcast-join` | D |
| 6 | `unions` | union, unionAll, unionByName | `code-unions` | C |
| 7 | `explode` | Splitting & exploding arrays | `code-explode` | C |
| 8 | `aggregates` | The aggregates the exam tests | `code-aggregates` | C |
| 9 | `window-functions` | The pattern silver & gold lean on | `code-windows` | C |
| 10 | `tuning-knobs` | The four tuning knobs | `tuning-knobs` | D |
| 11 | `writing-to-silver` | Save modes, partitioning, idempotency | `code-write-silver` | C |

**11 scenes** (4 diagram + 7 code) — the split the plan predicted. The most code-heavy course — closest in shape to `../python`'s cheat-sheet courses.

## 5 · `modeling` — Medallion & Declarative Pipelines (10)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `medallion` | What belongs in each layer | `medallion` | D |
| 2 | `gold-objects` | The five gold object types | `gold-objects` | D |
| 3 | `materialized-views` | Precomputed, auto-refreshed | `materialized-view` | D |
| 4 | `streaming-tables` | Append-only, continuous | `streaming-table` | D |
| 5 | `declarative-pipelines` | Defining datasets in Python & SQL | `code-pipeline` | C |
| 6 | `expectations` | Declarative data quality | `code-expectations` | C |
| 7 | `apply-changes` | APPLY CHANGES INTO — CDC & SCD | `code-apply-changes` | C |
| 8 | `pipeline-modes` | Modes, settings & the dev workflow | `pipeline-modes` | D |
| 9 | `gold-patterns` | What BI and ML want | `gold-patterns` | D |
| 10 | `decision-sheet` | Picking the right gold object | `gold-decision` | D |

**10 scenes.** §2 and §10 were planned to share `gold-objects`, but §2 is the five OBJECT TYPES while
§10's sheet spans the whole course — expectations, CDC, `CHECK`. Split, exactly as the ingestion
closer was. Concept budget 89 → 90, and the last shared bookend goes: **every section now has its own
scene.** The pattern worth keeping: a course's closing decision sheet always earns a scene of its own.

## 6 · `jobs` — Lakeflow Jobs (10)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `what-is-a-job` | What is a Lakeflow Job? | `job-anatomy` ▲ | D |
| 2 | `the-dag` | Tasks & dependencies | `job-dag` | D |
| 3 | `task-types` | The four the exam names | `task-types` | D |
| 4 | `control-flow` | if/else, for_each, retries | `control-flow` | D |
| 5 | `triggers` | Time-based vs. data-driven | `triggers` | D |
| 6 | `job-compute` | Per-task compute choice | `job-compute` | D |
| 7 | `parameters` | Parameters, task values & references | `code-parameters` | C |
| 8 | `notifications` | Notifications & operational hooks | `notifications` | D |
| 9 | `repair-rerun` | Monitoring, repair & rerun | `repair-rerun` | D |
| 10 | `defining-a-job` | UI, REST API & YAML | `code-job-yaml` | C |

**10 scenes**, one per section. §2 `job-dag` is the one scene in the concept that IS the thing it
describes — a real DAG, laid out by the engine from the edges, with three roots fanning into
`silver_build`. §10 stayed a code card: the YAML shape is what course 7 then ships.

## 7 · `cicd` — Git Folders, Bundles & the CLI (9)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `the-problem` | The problem CI/CD solves here | `cicd-problem` | D |
| 2 | `git-folders` | Databricks Git Folders | `git-folders` | D |
| 3 | `bundle-manifest` | The databricks.yml manifest | `code-databricks-yml` | C |
| 4 | `resources` | Jobs, pipelines & bundle-managed objects | `code-resources` | C |
| 5 | `variables` | One codebase, three behaviours | `code-variables` | C |
| 6 | `the-cli` | validate / deploy / run / destroy | `code-cli` | C |
| 7 | `promotion` | dev → test → prod | `promotion-flow` | D |
| 8 | `run-as` | Service principals in non-dev | `run-as-identity` | D |
| 9 | `bundle-scope` | What belongs in a bundle | `bundle-scope` | D |

**9 scenes.** §3–§6 are the YAML/CLI block, the second dense code run.

## 8 · `troubleshooting` — Monitoring & Optimization (10)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `diagnostic-flow` | Where to look first | `diagnostic-flow` ▲ | D |
| 2 | `run-history` | Trend, not snapshot | `run-history` | D |
| 3 | `spark-ui` | Reading the tabs | `spark-ui` | D |
| 4 | `skew` | Spotting and fixing data skew | `data-skew` | D |
| 5 | `shuffle` | The cost and how to cut it | `shuffle` | D |
| 6 | `spill` | When a stage runs out of memory | `disk-spill` | D |
| 7 | `aqe` | What AQE fixes automatically | `aqe` | D |
| 8 | `auto-maintenance` | Liquid Clustering & Predictive Optimization | `predictive-optimization` | D |
| 9 | `common-failures` | Cluster startup & library conflicts | `common-failures` | D |
| 10 | `oom` | Executor vs. driver, and the fixes | `oom-patterns` | D |

**10 scenes, all diagram** — the only such course; every section teaches a mechanism or a decision,
none is syntax. Nine share one spine: **symptom → diagnosis → ranked remedy**, which the `-ct`
narration follows almost verbatim, and the ranking matters (AQE first, memory last). §1 folds the
five diagnostic steps by WHICH UI you are in — Jobs UI to localise the task, Spark UI to localise the
stage — rather than running a five-card chain.

## 9 · `governance` — Security & Access Control (9)

| § | Section id | Title | Scene | |
|--:|-----------|-------|-------|--|
| 1 | `security-hierarchy` | How Unity Catalog governs access | `security-hierarchy` ▲ | D |
| 2 | `privileges` | What each privilege buys you | `privileges` | D |
| 3 | `grant-revoke` | GRANT / REVOKE / DENY on principals | `code-grants` | C |
| 4 | `column-masking` | Column masking | `code-masking` | C |
| 5 | `row-filters` | Row filters | `code-row-filters` | C |
| 6 | `abac` | Attribute-based access control | `abac` | D |
| 7 | `dynamic-views` | The older fine-grained alternative | `code-dynamic-views` | C |
| 8 | `audit-log` | Who did what, and when | `audit-log` | D |
| 9 | `decision-sheet` | Picking the right access control | `access-control-decision` | D |

**9 scenes.**

---

## Exam alignment (May 4, 2026 guide)

45 scored multiple-choice questions, 90 minutes. Official domain weights, against the share of the
90 sections each course gets:

| Exam domain | Weight | ≈ items | Course(s) | Sections | Share |
|-------------|-------:|--------:|-----------|---------:|------:|
| 1 · Databricks Intelligence Platform | 6% | 3 | `platform` | 10 | 11% |
| 2 · Data Ingestion and Loading | 21% | 9 | `ingestion` | 11 | 12% |
| 3 · Data Transformation and Modeling | 22% | 10 | `transformations` + `modeling` | 21 | 23% |
| 4 · Working with Lakeflow Jobs | 16% | 7 | `jobs` | 10 | 11% |
| 5 · Implementing CI/CD | 10% | 5 | `cicd` | 9 | 10% |
| 6 · Troubleshooting, Monitoring, Optimization | 10% | 5 | `troubleshooting` | 10 | 11% |
| 7 · Governance and Security | 15% | 7 | `governance` | 9 | 10% |
| — (prerequisite substrate) | — | — | `delta-uc` | 10 | 11% |

Three courses land on their weight (`transformations`+`modeling`, `cicd`, `troubleshooting`).
`ingestion`, `jobs` and `governance` run slightly light against weight; `platform` runs heavy.

`delta-uc` has no domain of its own — but it is not spare weight. The guide's ingestion objectives
are all "into Unity-Catalog–governed tables"; domain 7 tests managed vs. external tables directly;
and the guide's own sample question 2 is answered by *"Delta Lake ACID transactions and time travel,
governed by Unity Catalog"* — pure `delta-uc` material scored under domain 1. It is the substrate the
other courses stand on.

## Verdict: port the existing content, do not re-author

Audited the 90 `-ct` sections against every item the exam guide names. **46 of 48 named objectives
are covered**, and the two misses are trivial:

- `cross join` — RESOLVED, and the audit overstated it: the type IS covered (a `cross` row in §4's
  join-type table). Only the exact two-word phrase was missing from the grep. No change needed.
- "stage-level metrics" — the phrase is absent, but the substance is there ("Stages tab" in both
  `troubleshooting-diagnostic-flow` and `troubleshooting-spark-ui`). No change needed.

Everything else the guide names is present, including the details a stale course would miss:
Auto Loader directory-listing vs. file-notification, `spark.sql.shuffle.partitions` /
`spark.default.parallelism` / `autoBroadcastJoinThreshold`, the four Lakeflow task types, file-arrival
and table-update triggers, Liquid Clustering, Predictive Optimization, deletion vectors, ABAC, and
dynamic views.

The strongest signal that this content tracks the **current** exam: it uses "Automation Bundle"
(12 occurrences) over the retired "Asset Bundle" (3) — the rename the May 2026 guide introduces — and
uses Lakeflow Jobs / Lakeflow Connect throughout rather than Workflows / DLT. It was written against
this guide, not an earlier one.

It is also written in the exam's own shape. The decision-sheet sections (`ingestion` §11,
`modeling` §10, `governance` §9) are scenario → correct-choice tables, which is exactly how the
guide's sample questions are posed.

**Re-authoring would cost 90 slides, 90 narration scripts and 131 minutes of regenerated audio to
arrive at roughly the same place.** Port it. Spend the effort on scenes, which do not exist at all.

## Verdict: 9 courses, no capstone

Recommend dropping the project capstone that `../aws`, `../apache-spark` and `../python` each carry.

- Those are **skill** concepts, where a capstone proves you can build the thing. This is a
  **certification** concept, and the certification is 45 multiple-choice questions with no project
  component. The capstone would not serve the goal the learner arrived with.
- It is the only part of the plan with **zero ported content** — no slide, no narration, no audio.
  ~11 sections and ~11 scenes of fresh authoring, added at the point where the concept is otherwise
  finished.
- The `-ct` spine already made this call once: its source curriculum's `10-practice-exam.ipynb` was
  deliberately dropped from the video set.

If something is wanted after the nine ship, a short **exam-drill** course (scenario questions in the
guide's own format) would serve this audience far better than a build project. That is a decision to
take later, with the nine done.

## Verdict: keep all 90 sections — the cost is scenes, not sections

Trimming sections saves almost nothing. The slides, narration and audio are already written, so a cut
section returns only the scene that would have been drawn for it. **~87 scenes is the entire project
cost**, and it is close to fixed: this engine has no camera or reveal (`focus` glows a single node),
so a section that teaches a distinct mechanism needs its own solid scene — the same constraint that
kept `../apache-spark` and `../python` from sharing spines aggressively. Disciplined bookending gets
87 down to roughly 78; it does not get to 50.

The one course worth questioning is `platform` — 10 sections against a 6% domain, the largest
over-invest in the plan. I still recommend keeping it whole: it is the on-ramp, a concept that opens
thin reads badly, and I checked the two sections that looked redundant (§2 "what the platform is" and
§4 "the platform stack") — they are genuinely different cuts, the product framing versus the
technical stack. If a trim is wanted anyway, this is the only place I would take it.

## Scene budget

~90 scenes across the 9 courses (63 diagrams + 27 code cards) — one per section, no sharing. For
scale: `../apache-spark` is 26 scenes / 47 sections, `../python` is ~60 scenes / 77 sections.

## What ports, what gets authored fresh

**Ports near-verbatim from `-ct`** — this is what keeps 90 sections tractable:
- **Slides.** The `.slide` files are the same markdown dialect one heading level up (`# Title` +
  `## sub-label` there; `## Title` + `### sub-label` here). A mechanical demotion, then a fit check
  in the pane.
- **Narration.** The `.tts` files are already written as flowing spoken script — exactly this repo's
  `Section.narration` field.
- **Audio.** 90 generated `.wav`s, 131 minutes total. They drop into
  `public/audio/<course>/<section-id>.wav` under the new ids. **No Colab round-trip needed** — as
  long as a section's narration text is not edited during the port. Any section whose narration we
  rewrite needs its wav regenerated.
  *Caveat:* 359 MB of audio. `../python` was bitten by stray wavs in `public/audio`; decide up front
  whether these are committed here or fetched (see open questions).

**Authored fresh — every scene.** The `-ct` repo contains no scenes; its two scenes lived app-side in
the retired `graphl-movie` and are written against a different engine (hand-placed `cell:[x,y]`,
explicit colors) than this repo's declarative `Scene`. Same incompatibility the Spark and Python
ports hit. Scenes are the real work of every slice.

## Slice plan

Slice 0 (**done**) = scaffold. Slices 1–9 = one course each, in arc order. Per slice, following the
working agreement: **ASCII-sketch each diagram scene for approval first**, then author scenes, split
the ported slide + narration into `Section` files, register both, drop in the wavs, `npm run build`
+ `npx tsc --noEmit` clean, owner verifies in the browser, stop.

Courses 4 and 7 are mostly code cards — for those the sketch step collapses to a plan listing the
cards up front (the convention settled in `../python`).

## Settled decisions (2026-08-30)

1. **No capstone.** Nine courses. This is a certification concept — the exam is 45 MCQs with no
   project component — and a capstone is the one piece with no ported content behind it. If more is
   wanted after the nine ship, an exam-drill course in the guide's question format is the candidate.
2. **Audio is committed here.** All 90 wavs (359 MB) live in `public/audio/<course>/<section-id>.wav`,
   keeping the app self-contained like `../aws` and `../apache-spark`. `public/audio` must therefore
   stay OUT of `.gitignore` — and, learning from `../python`, no wav from another concept may ever be
   left in that tree.
3. **Short slugs confirmed.** `<course>-<section>` per the tables above
   (`02-05-changing-data-merge` → `delta-uc-merge`). Wavs are renamed to match on port.
