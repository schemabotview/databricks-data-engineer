import type { Section } from '../types'

export const columnRowOps: Section = {
  id: 'column-row-ops',
  title: 'Column & row operations',
  scene: 'code-column-row',
  slide: `## Column & row operations

### Column verbs
\`select\` picks and reorders · \`withColumn\` adds or replaces one · \`withColumnRenamed\` renames (handy right before a join) · \`drop\` removes.

The principle underneath: **DataFrames are immutable.** Every transformation returns a **new** DataFrame — \`withColumn\` doesn't mutate \`df\`. Miss that and you'll wonder why your change "didn't take".

### Row ops
\`filter\` and \`where\` are exact aliases. \`distinct()\` drops full-row duplicates; \`dropDuplicates([…])\` drops rows repeating on the listed columns.

### The trap
\`dropDuplicates\` keeps an **unspecified** survivor — you don't control which duplicate wins, because it depends on partition order. For deterministic *keep-the-latest*, rank with a **window** (\`row_number\` over \`partitionBy\`/\`orderBy\`, keep \`rn = 1\`).`,
  narration:
    "Column and row operations — select, with-column, filter, and dedup. These are the everyday verbs of shaping a DataFrame, plus one principle that ties them all together. On the column side there are four verbs. Select picks, reorders, or expression-evaluates columns and hands you a new DataFrame. With-column adds or replaces exactly one column, and it's the cheapest way to derive a value. With-column-renamed renames in place — really handy right before a join when both sides share a column name. And drop removes columns. Here's the principle underneath all of them: every transformation returns a new DataFrame. Spark DataFrames are immutable. When you call df-dot-with-column, you are not changing df — you're getting back a brand-new DataFrame that you bind to a variable. Miss that and you'll wonder why your change \"didn't take\". On the row side: filter and where are exact aliases — pick one and stay consistent. Both take either a boolean column or a S-Q-L string. Distinct drops full-row duplicates. Drop-duplicates with a subset drops rows that repeat on just the listed columns. But watch this, because it's a favourite exam trap. Drop-duplicates keeps an unspecified surviving row — you do not control which duplicate wins. So for deterministic \"keep the latest\" dedup — exactly what the bank's silver layer needs to handle retried upstream sends — you rank with a window: partition by transaction-i-d, order by ingested-at descending, add row-number, and keep row one. The window approach is deterministic; drop-duplicates is not, because which row survives depends on partition order. That determinism is why the exam loves the window trick.",
}
