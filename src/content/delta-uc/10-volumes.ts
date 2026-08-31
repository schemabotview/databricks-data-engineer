import type { Section } from '../types'

export const volumes: Section = {
  id: 'volumes',
  title: 'Volumes — governed storage for files',
  scene: 'volumes',
  slide: `## Volumes — files, not rows

Tables are for rows. **Volumes** are Unity Catalog's answer for everything that isn't tabular — raw JSON dumps, PDFs of loan agreements, model artifacts, libraries, image datasets.

### How they work
- A UC object like any other, with the same three-part name: **\`catalog.schema.volume\`**
- From a notebook you read and write real filesystem paths under **\`/Volumes/catalog/schema/name/…\`**

### Two flavours, mirroring tables
- **Managed volume** — UC owns the storage location; for unstructured data your own team produces
- **External volume** — UC catalogs files at a path you already own; for external drops, like the bank's **SFTP landing zone**

### Why they matter
They **replace the legacy \`dbfs:/mnt/…\` mounts**, which had no UC permission model at all.

**Exam:** whenever a question is about governing access to files that aren't Delta tables, volumes are the answer.`,
  narration:
    "Volumes — governed storage for files, not rows. Tables are for rows. Volumes are Unity Catalog's answer for everything that isn't tabular — raw J-SON dumps from a source system, P-D-Fs of loan agreements, model artifacts, libraries, image datasets. A volume is a Unity Catalog object like any other, with the same three-part name: catalog, schema, volume-name. And from a notebook, you read and write its files under a real filesystem path — slash-Volumes, then catalog, then schema, then the volume name. There are two flavours, mirroring tables exactly. A managed volume is one where Unity Catalog owns the storage location; you use it for unstructured data your own team produces. An external volume is one where Unity Catalog catalogs files at a path you already own; you use it for data dropped in by external systems — think of the bank's S-F-T-P landing zone, where the Cards source drops its daily extract files. And the key point for the exam: volumes replace the old d-b-f-s slash-mount mount points. Those legacy mounts had no Unity Catalog permission model at all; volumes do. So whenever a question involves governing access to files that aren't already Delta tables, volumes are the answer.",
}
