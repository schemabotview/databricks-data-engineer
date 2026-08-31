import type { Section } from '../types'

export const nestedJson: Section = {
  id: 'nested-json',
  title: 'Semi-structured & nested JSON',
  scene: 'code-nested-json',
  slide: `## Semi-structured & nested JSON

The card feed is nested JSON — each transaction one object, with \`card\`, \`merchant\` and \`auth\` sub-objects. Two options:

- **Land nested, flatten in silver** *(the exam's pick)* — Auto Loader infers \`STRUCT\` / \`ARRAY<STRUCT>\`; bronze keeps the nesting, silver flattens. You keep the shape **and** the replay
- **Land flat at the source** — cleaner downstream, but you give up the shape and the replay

### Three primitives to memorise
- **Dot access** — \`col("merchant.name")\` on \`STRUCT\` fields
- **\`explode(arr)\`** — one row per array element; the pattern for unpacking a line-items array
- **\`from_json(str, schema)\`** — parse a JSON string column into a struct; how \`_rescued_data\` becomes properly typed fields

For one object spread across many lines rather than newline-delimited JSON, set **\`multiLine = true\`** — an Auto Loader \`json\` format option.`,
  narration:
    "Semi-structured and nested data — JSON into Delta. The card-transactions feed from the payment processor is nested JSON. Each transaction is one object, with nested sub-objects for the card, the merchant, and the authorization. You have two options for handling that. Option one: land it nested, and flatten in silver. This is the bronze-then-silver pattern, and it's the one the exam rewards. Auto Loader infers a nested struct schema, so the bronze table has columns of type struct, or array-of-struct. Then silver flattens them, using dot-access, explode, and from-json where needed. You keep the original shape, and you keep the ability to reprocess. Option two: land it flat at the source — configure the upstream to emit already-flattened JSON. It's cleaner downstream, but you give up the original shape and the replay-ability. There are three primitives worth memorising. Dot access — select merchant-dot-name, merchant-dot-category — works on struct fields. Explode turns an array column into one row per element; that's your pattern for unpacking a line-items or events array. And from-json parses a stringified JSON column into a struct — that's how you turn the rescued-data column into properly typed fields. One more option shows up in answers. When a JSON file is a single object spread across many lines, rather than newline-delimited JSON, you set multi-line equals true. Auto Loader supports that as a format option when the cloud-files format is JSON.",
}
