import type { Section } from '../types'

export const whyDelta: Section = {
  id: 'why-delta',
  title: 'Why Delta Lake',
  scene: 'delta-vs-parquet',
  slide: `## Why Delta Lake

Raw Parquet on object storage is just files in a folder — three things keep breaking on the bank's card feed.

### What plain Parquet can't do
- **Partial writes are visible** — a job that dies mid-batch exposes half its files; nothing wrapped them in a transaction
- **Concurrent writers corrupt each other** — no lock, so the last writer wins and data is lost
- **No schema enforcement** — an upstream column change is silently dropped, or fails the read

Add to that: no time travel, no efficient row-level updates, no audit of who changed what.

### Delta Lake — one log over the same files
- An open table format that layers a **transaction log** over ordinary Parquet
- The **same files** gain ACID, schema enforcement, time travel, and audit
- Open source, and the **default table format** on Databricks`,
  narration:
    "Why Delta Lake — what raw Parquet on object storage doesn't give you. Picture the bank's card-transactions feed before Delta Lake existed. Parquet files land on S-3 every fifteen minutes, and the fraud dashboard reads the very same folder. Three things keep breaking. First, partial writes are visible. A spark job writing the ten-fifteen batch creates twenty Parquet files. If the cluster dies after fifteen of them are written, the dashboard sees fifteen new files sitting right next to the old ones. No transaction wrapped them, so that half-written result is exposed to everyone reading. Second, concurrent writers corrupt each other. Two jobs land late-arriving data into the same hour. They both list the folder, both write new files, and there is no lock. The final state just depends on who happens to finish last. Third, there is no schema enforcement. The source team adds a merchant-country column. The new files have eleven columns, the old ones have ten, and spark picks the first file it happens to see — silently dropping the column, or failing the read. And on top of all that: no time travel, no efficient row-level updates, and no audit of who changed what. Many teams built these guarantees by hand, badly. Delta Lake is the open-source table format that gives you every one of them, through a single transaction log laid over the very same Parquet files.",
}
