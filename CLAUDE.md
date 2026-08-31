# CLAUDE.md — databricks-data-engineer (lean operational pointers)

The **Databricks Certified Data Engineer Associate** concept app of GraphL. Workspace-wide
invariants, content model, and working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) —
read that first; this file is Databricks-specific.

## What this is

A standalone concept app: its own scenes + courses + a bundled render-engine (`src/render-engine`).
Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram or a code
snippet, the right slide is markdown. One section = one slide = one video segment.

## Course arc (9) — COMPLETE

`platform · delta-uc · ingestion · transformations · modeling · jobs · cicd · troubleshooting ·
governance`. Played in this syllabus order. **90 sections, 90 scenes, 90 wavs (2h 11m)** — one scene
per section, no sharing. The full spine lives in [`COURSE-PLAN.md`](./COURSE-PLAN.md).

This concept is **code-heavy** — SQL and PySpark carry much of the teaching — so many sections ride
a `kind: 'code'` card rather than a diagram (the same renderer as `../python` / `../apache-spark`).

## Content provenance

Ported from `~/Workspace/databricks-data-engineer-ct` (9 modules / 90 sections, exam-aligned, with
`.slide` + `.tts` already written per section) — the refined video-target spine. Its own upstream
sources, for anything the port leaves ambiguous: `~/Projects/databricks-data-engineer` (the original
per-module curriculum notebooks) and `~/Products/databricks-data-engineer-content` (the older
graphl-ux-era repo). Scenes must be **authored fresh** — the `-ct` repo holds no scenes (they lived
app-side in the retired `graphl-movie`), and this engine's declarative `Scene` is a different shape.

## Layout

```
src/render-engine/   layout + renderer (import from the barrel index, never deep paths)
src/scenes/          scenes + registry (a scene can be shared across sections)
src/content/         courses → sections + registry
src/section/         scene-left / slide-right composited view (responsive)
src/App.tsx          hash router: #/<course-section> (section) · #/<scene> (individual)
scripts/             record-course · record-reels · thumb · gen-descriptions · colab · audio-manifest
public/audio/<course>/   narration wavs
```

## Content budgets (HARD — nothing enforces these at build time)

Two limits the engine silently breaks rather than erroring on. `npm run check` guards both; run it
with the build.

- **Leaf cards are a fixed 210×96** (`NODE_W`/`NODE_H`). Only *containers* grow to fit their text
  (`layout.ts headerHeight`); a leaf whose text overruns the ~134px column spills outside its card,
  top and bottom, because the text block is vertically centred. What matters is **wrapped lines, not
  character count**, so the guard models it and caps the block at 92 (the card is 96).
  **Rule of thumb: keep the label to 2 wrapped lines.** 2 label lines + 2 sub lines = 76px and fits
  comfortably; a 3-line label is what pushed every early violation over. Short name in `label`,
  detail in `sub`.
- **A long UNBREAKABLE token overflows sideways** — a separate failure the height model can't see,
  since it counts the token as one line. Hyphens are break opportunities; **underscores, dots,
  slashes and parentheses are not**, so `/Volumes/catalog/schema/name/…` cannot wrap at all. Budget:
  **label token ≤ 14 chars, sub token ≤ 20**. The convention that follows: **the card carries the
  concept, the slide carries the exact identifier** — and where an identifier fits the sub's 20-char
  budget it moves there (`shuffle.partitions`, `INIT_SCRIPT_FAILURE`) rather than being lost.
- **Slides do not scale to fit.** `useSlideScale` sets `zoom = paneWidth / 806` — width-proportional
  only — so type size is fixed by the frame and an over-long slide **clips at the bottom**
  (`.slide-panel` is `align-items: safe center`, which falls back to start on overflow). The pane is
  **~1080 design px** tall, and `npm run check` models the rendered height against that.
  **Character count is NOT the budget** — it was, and it was wrong: a bullet-heavy slide renders far
  taller than prose of the same length. The slide that actually clipped was 869 chars (1198px
  modelled) while a 895-char slide rendered fine (953px), because its ten bullets each wrapped to two
  lines. **Watch wrapped bullet lines**: an `li` holds ~52 characters per line at this width, so
  keeping each bullet to one line is the cheapest way to buy height.

The ported `-ct` slides sit well under the budget — they were trimmed for a fixed 1920×1080 frame.
Enrich them from the section's `-ct` **notebook** (that repo's declared source of truth, and richer
than its slide) up to the budget. Enriching is safe for audio: narration is a separate field, so the
generated wav still matches. Expect to overshoot — most enriched slides come out long on the first
pass, and `check` catches them.

## Code cards

A code scene is one `kind: 'code'` node; `layout.ts` sizes it from the content and fitView scales the
scene, so the card's WIDTH sets the rendered type size.

- **Keep every source line at or under 76 columns** (`CODE_MIN_COLS`). One long line widens the card
  and shrinks that scene's code — cards below the minimum all render at one consistent size.
- **Never set `sub` on a SQL card.** `codeLines` appends it as `# …`, a Python comment. Put the
  commentary inline in `label` as `--`. (Python cards are fine — `#` is correct there.)
- **No fenced code blocks in a slide.** `index.css` styles inline `code` but not `pre`; code belongs
  in the LEFT scene as a card. Two ported `-ct` slides embedded fences — those became inline spans.

## Scene shape — fill the pane (BOTH axes)

The scene pane is roughly square (~1.05), and `fitView` scales a scene to fit its **longest** axis. So
a composition that is much longer than it is wide — *or* much wider than it is tall — gets scaled to
that axis and renders everything small, with dead space along the other. **Aim to keep the long axis
under about 2× the short one.**

The arithmetic, since leaf cards are a fixed 210×96:

- a **TB** chain of N cards ≈ 240 wide × N×186 tall → N≥4 is a ~0.25 ribbon (too tall)
- an **LR** chain of N cards ≈ N×254 wide × ~150 tall → N≥4 is a ~2.5–3.7 ribbon (too wide)

Both failure modes were shipped and caught in review. Four ways out:

- **Give each band real width** — make a layer a container of its own members as tiles rather than one
  card with a `sub` (`platform-stack`). This usually teaches more too.
- **Wrap a list two-up** with `cols: 2` (`compute-decision`), or make a wide band `cols: 2` so it adds
  height instead of width (`materialized-view`'s buys band).
- **Fold a long LR chain into stages** (`promotion-flow`: six steps → two bands of three). Often this
  is *more* truthful — that fold surfaced the two CI stages a flat chain hid.
- **Drop the flow** so an edgeless stack uses `STACK_GAP_Y` (28) instead of `GAP_Y` (90) — over four
  layers that reclaims 270px of pure arrow space.

## Scene edges — two rules learned the hard way

Neither is machine-checkable (an edge to the wrong node still builds and still renders), so they are
review habits:

- **Draw the edge at the level of the relationship.** If the claim is about two *bands*, connect the
  two containers — not one arbitrary leaf inside each. `warehouse → delta` said "the warehouse became
  Delta Lake" when the point was that the whole two-system era gave way to the lakehouse; it had to
  be `before → lakehouse`. Only connect leaves when the leaf-to-leaf relationship *is* the teaching
  point (`classic → storage` and `serverless → storage`: both flavours reach the same storage).
- **A foundation points UP at what is built on it.** Cloud object storage → Delta Lake → Unity
  Catalog, never the reverse — use `flow: 'BT'` so the base sits at the bottom and the arrows climb.
  Drawing it downward reads as "these layers produce storage".

## Build & verify

- `npm install` → `npm run dev`; `npm run build`, `npx tsc --noEmit` and `npm run check` must all
  stay clean.
- No test runner. Bar for a change: **build clean + visually correct** at the relevant `#/<id>`.
- Adding a scene: define in `src/scenes/<course>/`, list it in that folder's `index.ts`.
- Adding content: add a `Section` under `src/content/<course>/`, list it in that folder's `index.ts`.

## Working agreement

Owner drives, **one reviewed slice at a time**: propose → approve → build → verify in-app → stop.
Before authoring a course/scene, deliver an **ASCII sketch** of the scene for approval first.
