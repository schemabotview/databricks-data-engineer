import type { Scene } from '../../render-engine'

// §5–§7 — the pipeline code block. §5 and §6 are Python (`#` comments read natively); §7 is SQL, so
// its commentary is inline `--` and it sets no `sub` (codeLines would append it as a `#` comment).
// All lines stay at or under CODE_MIN_COLS (76) so every card in the deck renders at one type size.

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codePipeline = code(
  'code-pipeline',
  'pipeline.py',
  `# Lakeflow Spark Declarative Pipelines (formerly DLT).
# RENAME WATCH: the exam may use either name -- but the code did
# not change. Decorators are still @dlt.*, SQL still says
# STREAMING TABLE / MATERIALIZED VIEW.

@dlt.table(comment="Raw card transactions")
def bronze_card_transactions():
    return (spark.readStream.format("cloudFiles")
              .option("cloudFiles.format", "json")
              .load("/Volumes/fintech_dev/landing/cards/"))

@dlt.table(comment="Cleaned card transactions")
def silver_card_transactions():
    return (dlt.read_stream("bronze_card_transactions")
              .where(col("customer_id").isNotNull()))

# You never write OUT to a table -- the decorator materialises it.

# TWO READERS to memorise, both for datasets in THIS pipeline:
#   dlt.read("name")         -> read it as a BATCH snapshot
#   dlt.read_stream("name")  -> read it as a STREAM

# The framework builds the whole DAG from those reads, so you
# never specify task order. You declare datasets; it works out
# what runs when.`,
)

export const codeExpectations = code(
  'code-expectations',
  'expectations.py',
  `# Expectations are predicates attached to a pipeline dataset.
# The KEYWORD decides what a violation does -- map severity to it.

@dlt.table
@dlt.expect_all({"valid_customer": "customer_id IS NOT NULL"})
@dlt.expect_or_drop("reasonable_amount", "amount < 1000000")
@dlt.expect_or_fail("valid_currency", "currency IN ('INR','USD')")
def silver_card_transactions():
    return dlt.read_stream("bronze_card_transactions")

#   expect          row KEPT, violation logged   -> track
#   expect_or_drop  row DROPPED, logged          -> filter
#   expect_or_fail  pipeline STOPS on the first  -> page a human

# Not every table needs a pipeline. Plain Delta has CHECK:
#   ALTER TABLE silver.card_transactions
#     ADD CONSTRAINT positive_amount CHECK (amount > 0);

# CHECK fails the WRITE -- there is no drop-and-log option -- and
# it is table-level, so it binds every writer.
#   "reject at write time, plain Delta"  -> CHECK
#   "track / drop / fail by severity"    -> expectations`,
)

export const codeApplyChanges = code(
  'code-apply-changes',
  'apply_changes.sql',
  `-- Declarative CDC. You CAN hand-write MERGE (course 2), but it
-- is verbose and race-prone -- especially for type-2 history.

CREATE OR REFRESH STREAMING TABLE silver_customers;

APPLY CHANGES INTO live.silver_customers
FROM   STREAM(live.bronze_customers_cdc)
KEYS   (customer_id)
APPLY AS DELETE WHEN _change_type = 'delete'
SEQUENCE BY _commit_version
STORED AS SCD TYPE 1;          -- or TYPE 2 to keep history

-- THE FIVE CLAUSES ---------------------------------------------
--   KEYS                 the natural key for the upsert
--   SEQUENCE BY          "latest wins" when changes arrive
--                        late or out of order
--   APPLY AS DELETE WHEN propagate hard deletes from the source
--   SCD TYPE 1           overwrite in place, no history
--   SCD TYPE 2           start/end timestamps + is_current,
--                        maintained for you automatically

-- EXAM: "declarative CDC that keeps full history"
--       -> APPLY CHANGES ... SCD TYPE 2, never a hand-written
--          MERGE (which is a multi-statement race).`,
)
