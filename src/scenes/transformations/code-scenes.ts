import type { Scene } from '../../render-engine'

// The transformations code block — seven of the course's eleven sections. All Python, so `#` is the
// native comment and the commentary reads inline. Same house rule as every card: source lines at or
// under CODE_MIN_COLS (76), or the card widens and fitView renders the whole scene's type smaller.

const code = (id: string, filename: string, label: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: `${id}-card`, kind: 'code', filename, label }],
  edges: [],
})

export const codeCleaning = code(
  'code-cleaning',
  'cleaning.py',
  `# Two jobs on every silver build: drop the bad nulls, pin types.

# --- nulls ---------------------------------------------------
clean = (df
  .dropna(subset=["transaction_id", "customer_id", "amount"])
  .fillna({"merchant_category": "unknown", "is_flagged": False}))

# dropna(how="any")  default -- drop if ANY column is null
# dropna(how="all")           -- drop only if EVERY column is
# ...scope either with subset=[...]

# --- types ---------------------------------------------------
silver = (clean
  .withColumn("amount", col("amount").cast("decimal(18,2)"))
  .withColumn("transaction_at", to_timestamp("transaction_at")))

# Bronze is STRING on purpose; silver pins the real types.

# THE PITFALL the exam loves: a cast that fails does NOT raise.
# It silently produces NULL. Defend against it:
#   - quarantine the bad rows and alert when the count climbs
#   - or use try_cast in Spark SQL, which makes the
#     null-on-failure behaviour explicit and intentional`,
)

export const codeColumnRow = code(
  'code-column-row',
  'column_row.py',
  `# Column verbs -- each returns a NEW DataFrame.
df.select("transaction_id", "amount")   # pick / reorder
df.withColumn("fee", col("amount") * 0.02)  # add or replace one
df.withColumnRenamed("cust_id", "customer_id")  # before a join
df.drop("_rescued_data")

# DataFrames are IMMUTABLE. withColumn does not mutate df -- it
# returns a new one. Miss that and your change "didn't take".

# Row ops
df.filter(col("amount") > 1000)        # filter == where, exactly
df.distinct()                          # full-row duplicates
df.dropDuplicates(["transaction_id"])  # survivor UNSPECIFIED

# THE TRAP: dropDuplicates keeps an arbitrary row -- you do not
# control which duplicate wins; it depends on partition order.

# Deterministic "keep the latest" -- what silver actually needs
# when an upstream retry sends the same transaction twice:
w = Window.partitionBy("transaction_id") \\
          .orderBy(col("ingested_at").desc())
(df.withColumn("rn", row_number().over(w))
   .filter("rn = 1")
   .drop("rn"))`,
)

export const codeUnions = code(
  'code-unions',
  'unions.py',
  `# Three lookalikes that behave differently.

jan.union(feb)          # matches by POSITION -- same count/order
jan.unionAll(feb)       # deprecated ALIAS for union, identical

jan.unionByName(feb, allowMissingColumns=True)   # by NAME
# allowMissingColumns=True fills a missing column with NULL
# instead of raising.

# THE TRAP -----------------------------------------------------
# Developers expect union to dedup, because SQL's UNION does.
# Spark's union is SQL's UNION ALL -- it KEEPS duplicates.
jan.union(feb).distinct()      # if you wanted the dedup

# RULE OF THUMB ------------------------------------------------
# Prefer unionByName in code that must survive schema change.
# Positional matching silently corrupts the moment someone
# reorders a column upstream: values line up under the wrong
# headers and NOTHING errors.`,
)

export const codeExplode = code(
  'code-explode',
  'explode.py',
  `# Bronze lands arrays and string-lists straight from JSON.

# split  -- string -> array:  "travel,food" -> ["travel","food"]
# explode -- one row PER ELEMENT of the array
# posexplode -- same, plus a \`pos\` index column

(df.withColumn("tags", split("merchant_tags", ","))
   .withColumn("tag", explode("tags"))
   .drop("tags"))

# DON'T explode just to filter -----------------------------------
# One row with 3 tags becomes 3 rows; if you only need
# membership, test it in place and keep the row count:
#   WHERE array_contains(tags, 'travel')

# The INVERSE -- re-nest inside a groupBy, for a compact gold row
(silver.groupBy("customer_id").agg(
    collect_list("tag").alias("all_tags"),   # keeps duplicates
    collect_set("tag").alias("distinct_tags")))  # dedups`,
)

export const codeAggregates = code(
  'code-aggregates',
  'aggregates.py',
  `# count("*") counts EVERY row.
# count("col") SKIPS NULLS -- the difference is a common question.

(silver.groupBy("customer_id").agg(
    count("*").alias("txn_count"),
    count("merchant_category").alias("with_category"),  # skips
    approx_count_distinct("merchant_name").alias("merchants"),
    _sum("amount").alias("total_spend"),
    mean("amount").alias("avg_spend")))          # mean == avg

# One pass over the group, five numbers.

# sum / min / max are null-skipping too.
# summary() emits count, mean, stddev, min, max and percentiles
# in a single call -- the quick ad-hoc profiling tool:
silver.summary("count", "mean", "stddev", "min", "max").show()

# THE EXAM TELL -------------------------------------------------
# "an APPROXIMATE count of distinct merchants across 50 billion
# rows" -- the word approximate is the tell. The answer is
# approx_count_distinct, NOT countDistinct, which would shuffle
# the full cardinality across the cluster.`,
)

export const codeWindows = code(
  'code-windows',
  'windows.py',
  `# A window computes a value PER ROW from the rows around it --
# and unlike groupBy it does NOT collapse rows. That is the point.

# Three ingredients: partitionBy (the group), orderBy (the order
# within it), and optionally a frame (rowsBetween / rangeBetween).
w = Window.partitionBy("customer_id") \\
          .orderBy(col("transaction_at").desc())

# JOB 1 -- dedup. Keep the latest row per key. DETERMINISTIC,
# which dropDuplicates is not.
df.withColumn("rn", row_number().over(w)).filter("rn = 1")

# JOB 2 -- period over period. lag looks back, lead looks forward.
df.withColumn("prev_amount", lag("amount").over(w))

# JOB 3 -- running total. Needs an EXPLICIT frame.
w_run = (Window.partitionBy("customer_id").orderBy("transaction_at")
         .rowsBetween(Window.unboundedPreceding, Window.currentRow))
df.withColumn("running_total", _sum("amount").over(w_run))

# Ranking family: rank() leaves gaps after ties,
# dense_rank() does not.`,
)

export const codeWriteSilver = code(
  'code-write-silver',
  'write_silver.py',
  `# Two write patterns, and one idea running through both.

# PATTERN 1 -- full overwrite. The rebuild is idempotent by
# design: if the job dies halfway, just re-run it.
(silver.write.mode("overwrite")
   .option("overwriteSchema", "true")    # only if schema changed
   .clusterBy("customer_id", "transaction_at")   # Liquid, not
   .saveAsTable("fintech_dev.silver.card_transactions"))

# Save modes: append | overwrite | error (default) | ignore

# PATTERN 2 -- upsert from bronze CDC, in SQL:
#   MERGE INTO silver.card_transactions t
#   USING bronze_updates s ON t.transaction_id = s.transaction_id
#   WHEN MATCHED     THEN UPDATE SET *
#   WHEN NOT MATCHED THEN INSERT *

# LAYOUT -- new tables use Liquid Clustering (course 2); it
# replaces partitionBy + ZORDER. Predictive Optimization keeps
# silver compact, so no manual OPTIMIZE job (course 8).

# THE THROUGHLINE is IDEMPOTENCY. An overwrite rebuild is safe to
# retry; a MERGE on the natural key is safe to re-apply. Either
# way a re-run converges to exactly the same silver.`,
)
