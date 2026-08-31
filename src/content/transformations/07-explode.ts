import type { Section } from '../types'

export const explode: Section = {
  id: 'explode',
  title: 'Splitting & exploding arrays',
  scene: 'code-explode',
  slide: `## Splitting & exploding arrays

Bronze often lands array or string-list columns straight from JSON. Turning those into one-value-per-row silver comes down to three primitives.

- **\`split(col, pattern)\`** — string → array (\`'a,b'\` → \`['a','b']\`)
- **\`explode(arr)\`** — one row **per element**; the pattern for line-items or an events array
- **\`posexplode(arr)\`** — the same, plus a \`pos\` index

Chaining them is the everyday move: split into an array, explode into rows, drop the intermediate column.

### Don't explode just to filter
If you only need membership — *"rows tagged travel"* — test it in place with **\`array_contains\`**. Exploding multiplies your row count for nothing.

### The inverse
Inside a \`groupBy\`, **\`collect_list\`** gathers values back into an array keeping duplicates; **\`collect_set\`** dedups. Flatten to process, collect back for a compact gold row.`,
  narration:
    "Splitting and exploding arrays — turning semi-structured data into rows. Bronze very often lands array columns, or string-list columns, straight from JSON. Turning those into clean, one-value-per-row silver data comes down to three primitives, and the exam tests each of them directly. Split takes a string and a pattern and turns the string into an array. So the string \"travel-comma-food-comma-fuel\" becomes an array of three elements. Explode is the workhorse: it emits one output row per array element. If a transaction has an array of three tags, explode turns that one row into three rows, one per tag. That's the classic pattern for line-items, or for an events array. Pos-explode is the same as explode, except it also gives you the position index — a column called pos — so you know each element's place in the original array. Chaining them is the everyday move: split a comma-string into an array with split, then explode that array into rows, then drop the intermediate array column. But there's an important shortcut. If all you need to do is filter — \"give me rows tagged travel\" — you should not explode every row just to test membership. Use array-contains in your WHERE clause; it tests membership in place, without multiplying your row count. And there's an inverse operation, for when you want to go the other way and re-nest. Inside a group-by, collect-list gathers values back into an array and keeps duplicates, with order undefined; collect-set does the same but deduplicates. So you flatten out with explode to process, and collect back into an array for a compact gold row.",
}
