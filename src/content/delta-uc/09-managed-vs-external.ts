import type { Section } from '../types'

export const managedVsExternal: Section = {
  id: 'managed-vs-external',
  title: 'Managed vs. external tables',
  scene: 'managed-vs-external',
  slide: `## Managed vs. external tables

Every UC table is one flavour or the other — and the choice decides ownership, \`DROP\`, and which features you get.

### The split
- **Managed** — UC owns metadata **and** files (a UC-managed location); \`DROP\` deletes both after retention
- **External** — UC owns metadata only; files sit at **your** path inside an external location; \`DROP\` removes metadata, **files stay**

### What managed gets that external doesn't
**Predictive Optimization** and full UC lifecycle management. External tables get neither.

### Choosing & converting
- **Exam default: prefer managed.** Go external only for a multi-tool lake, files produced outside Databricks, or a regulator-fixed path you control
- **\`ALTER TABLE … SET MANAGED / SET EXTERNAL\`** — metadata-level on the UC side; the three-part name is unchanged, files may move, and you need privileges on both table and storage location`,
  narration:
    "Managed versus external tables — and converting between them. Every Unity Catalog table is one of two flavours, and that choice decides a great deal downstream. A managed table means Unity Catalog owns both the metadata and the underlying files. The files sit in a Unity-Catalog-managed storage location, tied to the catalog or schema. Drop the table, and after the retention window, the files are deleted too. An external table means Unity Catalog owns only the metadata; the files live at a path you specify, inside a Unity Catalog external location. Drop the table, and only the metadata goes — the files themselves stay right where they are. That one difference drives everything else. Who owns the files — Unity Catalog, or you. What drop-table does — deletes the data, or just forgets it. And crucially, managed tables get Predictive Optimization and the full lifecycle management; external tables do not. So what should you pick? The default the exam rewards is: prefer managed. External tables exist for specific reasons — you're running a multi-tool data lake, the files are produced by something other than Databricks, or a regulator requires the files at a fixed path you control. If none of those apply, choose managed. And you can convert either direction, with alter-table set-managed, or set-external. Both are metadata-level operations on the Unity Catalog side — the three-part name stays the same. The physical files may or may not move, depending on which way you're going, and you'll need privileges on both the table and the target storage location.",
}
