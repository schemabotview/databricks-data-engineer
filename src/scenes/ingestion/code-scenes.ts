import type { Scene } from '../../render-engine'

// §2, §5, §9 — the ingestion code block. Same house rules as the delta-uc cards: every source line at
// or under CODE_MIN_COLS (76), and no `sub` on a SQL card (codeLines appends it as a `#` comment).
// §5 and §9 are Python, so `#` is correct there and the commentary reads natively.

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeCopyInto = code(
  'code-copy-into',
  'copy_into.sql',
  `-- Loads files into Delta and REMEMBERS which it already loaded.
-- That idempotency is the whole point.

COPY INTO fintech_dev.bronze.bank_accounts_raw
FROM '/Volumes/fintech_dev/landing/zone/accounts/'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true')   -- READER opts: the source
COPY_OPTIONS  ('mergeSchema' = 'true'); -- WRITER opts: the table

-- Run it again and it is a NO-OP for files already taken --
-- Delta records the loaded paths. Safe to put on a schedule.

-- Formats: CSV, JSON, AVRO, ORC, PARQUET, XML, BINARYFILE

-- Reach for COPY INTO when:
--   a daily batch of few files, on a predictable cadence
--   you want declarative SQL, no streaming to debug`,
)

export const codeCloudfilesSchema = code(
  'code-cloudfiles-schema',
  'auto_loader.py',
  `# Auto Loader caches the inferred schema at schemaLocation and
# compares every later batch against it.

(spark.readStream.format("cloudFiles")
   .option("cloudFiles.format", "json")
   .option("cloudFiles.schemaLocation", schema_loc)
   .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
   .load(src)
 .writeStream
   .option("checkpointLocation", ckpt)
   .trigger(availableNow=True)
   .toTable("fintech_dev.bronze.card_txns_raw"))

# schemaEvolutionMode -- what a NEW column does:
#   addNewColumns    (default) stream fails; restart evolves it.
#                    Best for production: no silent drift.
#   rescue           never fails; unknowns -> _rescued_data
#   failOnNewColumns fails until YOU evolve it (regulated data)
#   none             silently ignored -- only if you own upstream

# _rescued_data catches anything that did not fit -- a new column,
# an uncastable value -- as JSON. With rescue, nothing is dropped.
# schemaHints pins a few types without writing a full schema.`,
)

export const codeNestedJson = code(
  'code-nested-json',
  'nested_json.py',
  `# The card feed is nested JSON: card, merchant, auth sub-objects.
# Land it NESTED in bronze, flatten in silver -- the exam's pick.
# You keep the original shape, and you keep replay.

from pyspark.sql.functions import col, explode, from_json

# 1. DOT ACCESS -- reach into a STRUCT field
silver = bronze.select(
    col("transaction_id"),
    col("merchant.name").alias("merchant_name"),
    col("merchant.category").alias("merchant_category"),
)

# 2. EXPLODE -- one row per element of an ARRAY<STRUCT>
line_items = bronze.select(
    col("transaction_id"),
    explode(col("line_items")).alias("item"),
)

# 3. FROM_JSON -- parse a JSON *string* column into a struct.
#    This is how you give _rescued_data real types.
recovered = bronze.select(
    from_json(col("_rescued_data"), rescued_schema).alias("r")
)

# One object spread over many lines (not newline-delimited JSON)?
#   .option("multiLine", "true")   -- a cloudFiles json format opt`,
)
