import type { Section } from '../types'

export const transactionLog: Section = {
  id: 'transaction-log',
  title: 'The transaction log & ACID',
  scene: 'delta-log',
  slide: `## The transaction log & ACID

A Delta table = **Parquet data files** + a **\`_delta_log\`** beside them. The log is what turns a pile of files into a table.

### The log — an ordered list of commits
- **\`add\`** — a file joins the table, with min/max/null **stats** so Delta can skip files without opening them
- **\`remove\`** — a file leaves; the bytes stay until **\`VACUUM\`**
- **\`metaData\`** — schema and table properties
- Readers **replay the log**; a **checkpoint** every 10 commits keeps reads fast as history grows

### The commit *is* the transaction
- **Atomicity** — a commit lands when the next \`.json\` appears: one atomic write, so readers see it or they don't
- **Consistency** — validated against the current schema and constraints
- **Isolation** — **optimistic concurrency**: first writer wins, the loser re-reads and retries
- **Durability** — the object store persists log and data`,
  narration:
    "The transaction log, and A-C-I-D — how a commit buys the guarantees. A Delta table on disk is really two things sitting in one directory. There are the Parquet data files, which are ordinary column files — anything that reads Parquet can read them. And beside them there is a folder called underscore-delta-log. That log is what turns a pile of files into a real table. The log holds an ordered sequence of J-SON commit files, one per transaction. Each commit lists actions. An add action means a Parquet file is now part of the table, and it carries statistics — the min, max, and null count per column — so Delta can skip files at read time without ever opening them. A remove action means a file is no longer part of the table; the bytes aren't deleted yet, that's what vacuum does later. And a metadata action carries the schema and table properties. A reader replays the log to compose the current state: which files belong, and what columns they have. Every ten commits, Delta writes a checkpoint — a Parquet snapshot of the whole log — so reads stay fast even as history grows. Now, those atomic commits are exactly what buy you A-C-I-D on object storage. Atomicity: a transaction lands the moment the next J-SON file appears, which is a single atomic write — readers either see it, or they don't. Consistency: every commit is validated against the current schema and constraints. Isolation comes from optimistic concurrency — two writers prepare independently, whoever writes their commit file first wins, and the loser simply re-reads the log and retries. And durability is handled by the object store itself. So the bank's nightly pipeline and its real-time fraud stream can write the same table without corrupting each other. Each commit either fully succeeds, or it retries. Never a partial result.",
}
