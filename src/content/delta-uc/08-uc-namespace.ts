import type { Section } from '../types'

export const ucNamespace: Section = {
  id: 'uc-namespace',
  title: 'Unity Catalog & the three-level namespace',
  scene: 'uc-namespace',
  slide: `## Unity Catalog & the namespace

Delta makes the files trustworthy; Unity Catalog makes the objects **discoverable and governed** — one catalog across SQL, Python, ML, and dashboards.

### What UC adds over the hive metastore
- **Unified permissions** — GRANT/REVOKE on principals at any level
- **Lineage & audit** out of the box
- **Cross-workspace, cross-cloud** — one metastore per region

### \`catalog.schema.object\`
- **metastore → catalog → schema → object**
- Six securables: **tables, views, volumes, functions, models, materialized views**
- Permissions **flow down**: \`USE CATALOG\` plus \`SELECT\` on gold reads every gold table, and nothing in bronze

### Legacy — \`hive_metastore\`
Per-**workspace**, not regional, so no cross-workspace governance. **Never** put new tables there; against a three-part UC name, the three-part name always wins.`,
  narration:
    "Unity Catalog, and the three-level namespace. Delta Lake makes the files on disk trustworthy. Unity Catalog makes the tables, views, volumes, functions, and models discoverable and governed — one catalog spanning S-Q-L, Python, machine learning, and dashboards. There are three things it does that the legacy hive metastore simply could not. It gives you a unified permission model, with grant and revoke on principals at any level of the hierarchy. It gives you lineage and audit out of the box. And it gives you cross-workspace, cross-cloud namespacing, with one metastore per region shared by every workspace there. The namespace has three levels, so every object has a three-part name: catalog, dot, schema, dot, object. At the top is the metastore, one per region. Inside it are catalogs — say, fintech-dev. Inside each catalog are schemas — bronze, silver, gold. And inside each schema live the objects. Six object types are securable at that schema level: tables, views, volumes, functions, models, and materialized views. And permissions flow down the hierarchy — granting use-catalog on fintech-dev, plus select on the gold schema, lets someone read every table in gold, without ever touching bronze or silver. We cover the full grant semantics in module nine. One legacy callout. Every workspace that pre-dates Unity Catalog still has a special catalog called hive-metastore, holding old two-part schema-dot-table names. It is per-workspace, not regional — so there is no cross-workspace governance — and new tables should never land there. Whenever the exam contrasts a hive-metastore name against a full three-part Unity Catalog name, the three-part name is always the right answer.",
}
