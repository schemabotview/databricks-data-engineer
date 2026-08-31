import type { Scene } from '../../render-engine'

// §3–§6 — the SQL block. Each is ONE code node: a `kind: 'code'` card renders the IDE window and the
// layout sizes it from the content, so the whole scene is the card.
//
// Two house rules for these (see codeMetrics.ts):
//  · Keep every source line at or under CODE_MIN_COLS (76). A longer line widens the card, and since
//    fitView scales the scene to the pane, a wider card renders its type SMALLER — so one long line
//    shrinks the whole deck's code.
//  · Do NOT set `sub` on a SQL card. `codeLines` appends it as `# …`, a Python comment; SQL comments
//    are `--`, so the commentary lives inline in `label` instead.

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeTimeTravel = code(
  'code-time-travel',
  'time_travel.sql',
  `-- Every past version still exists: the log is append-only.

-- What happened to this table, and when?
DESCRIBE HISTORY fintech.silver.card_transactions;

-- Rewind the READ, by version -- "what did the model train on?"
SELECT * FROM fintech.silver.card_transactions VERSION AS OF 42;

-- ...or by wall-clock time -- "what did the dashboard show at 9am?"
SELECT * FROM fintech.silver.card_transactions
  TIMESTAMP AS OF '2026-08-30T09:00:00';

-- Rewind the TABLE: writes a NEW commit equal to a past version.
RESTORE TABLE fintech.silver.card_transactions TO VERSION AS OF 42;

-- How far back you can go -- VACUUM aggressively and you lose it.
ALTER TABLE fintech.silver.card_transactions SET TBLPROPERTIES (
  delta.logRetentionDuration         = 'interval 30 days', -- commits
  delta.deletedFileRetentionDuration = 'interval 7 days'   -- files
);`,
)

export const codeSchema = code(
  'code-schema',
  'schema.sql',
  `-- Delta checks the schema on EVERY write. Enforcement is the default.

-- Upstream adds merchant_country -> this write FAILS, on purpose.
INSERT INTO fintech.silver.card_transactions
SELECT * FROM stream_batch;          -- AnalysisException: extra column

-- Evolution is OPT-IN, three ways:

-- 1. mergeSchema -- add the new columns; existing rows get NULL
df.write.option('mergeSchema', 'true')
  .mode('append').saveAsTable('fintech.silver.card_transactions')

-- 2. overwriteSchema -- replace the schema entirely (destructive, rare)
df.write.option('overwriteSchema', 'true')
  .mode('overwrite').saveAsTable('fintech.silver.card_transactions')

-- 3. Explicit DDL -- most auditable, and what you want in production
ALTER TABLE fintech.silver.card_transactions
  ADD COLUMNS (merchant_country STRING);

-- Auto Loader's modes ride this same primitive (module 03).
-- Silent column additions are simply not a thing on Delta.`,
)

export const codeMerge = code(
  'code-merge',
  'merge.sql',
  `-- MERGE INTO: the most-used Delta DML in production.
-- Joins a SOURCE of changes to the TARGET on a key.

MERGE INTO fintech.silver.customers AS t
USING daily_changes AS s
  ON t.customer_id = s.customer_id

WHEN MATCHED THEN                    -- SCD Type 1: update in place
  UPDATE SET t.city = s.city, t.updated_at = s.updated_at

WHEN NOT MATCHED THEN                -- brand new customer
  INSERT (customer_id, city, updated_at)
  VALUES (s.customer_id, s.city, s.updated_at)

WHEN NOT MATCHED BY SOURCE THEN      -- gone upstream: retire the row
  UPDATE SET t.is_current = false;

-- SCD Type 2 keeps history: close the old row, insert a new active
-- one. APPLY CHANGES INTO (module 05) wraps exactly this machinery.

-- UPDATE / DELETE have two strategies underneath:
--   copy-on-write   -- rewrite every file holding a matching row
--   deletion vectors -- modern default: a bitmap marks skipped rows,
--                       so a GDPR delete is a tiny commit, not a
--                       multi-GB rewrite. OPTIMIZE resolves it later.
DELETE FROM fintech.silver.customers WHERE customer_id = 90210;`,
)

export const codeMaintenance = code(
  'code-maintenance',
  'maintenance.sql',
  `-- Three commands every Delta table needs over its life.

-- 1. COMPACT -- streaming writes and MERGE leave many small files;
--    small files mean slow reads. Targets ~1 GB files.
OPTIMIZE fintech.silver.card_transactions;

-- 2. CLUSTER -- co-locate similar values so file-skipping improves.
--    A per-customer lookup then reads ~1% of the files, not all.
OPTIMIZE fintech.silver.card_transactions
  ZORDER BY (customer_id);

-- 3. RECLAIM -- the only one that actually deletes bytes. Removes
--    files marked for removal older than retention (default 7 days).
VACUUM fintech.silver.card_transactions;

-- The guardrail: Delta BLOCKS a shorter retention unless you override
-- it -- a short window breaks in-flight readers and kills time travel.
VACUUM fintech.silver.card_transactions RETAIN 168 HOURS;

-- On UC MANAGED tables, Predictive Optimization runs OPTIMIZE and
-- VACUUM for you automatically (module 08).`,
)
