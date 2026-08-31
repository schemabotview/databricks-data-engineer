import type { Section } from '../types'

export const sqlWarehouses: Section = {
  id: 'sql-warehouses',
  title: 'SQL warehouses & serverless',
  scene: 'sql-warehouses',
  slide: `## SQL warehouses & serverless

### SQL warehouse — compute for SQL & BI
Powers Databricks SQL, dashboards, the SQL editor, and BI tools like Power BI and Tableau. It **autoscales** — adding clusters as query load rises, removing them as it falls.

Three types: **Classic** and **Pro** run in *your* account (Pro adds advanced features); **Serverless** runs in Databricks' account, starts in seconds, and gives the best price/performance for SQL.

### Serverless — a modality, not a product
Databricks manages the compute, it starts in seconds, it autoscales, and you pay only for what you use — **no idle cost**. Available for **SQL warehouses, jobs, notebooks, and pipelines**.

The trade: give up some network control for instant start and zero cluster management.`,
  narration:
    "Sequel warehouses and serverless compute. Not every workload is a spark notebook. Sequel warehouses are compute tuned specifically for sequel and business intelligence. They power databricks sequel, dashboards, the sequel editor, and external business intelligence tools like power B-I and tableau. A warehouse absorbs many concurrent queries by autoscaling: adding more clusters as query load rises, and removing them as it falls. Warehouses come in three types. Classic and pro run in your own cloud account, where pro adds advanced features. Serverless runs in Databricks' account and starts in seconds, with the best price and performance for sequel. That last one points at a broader idea. Serverless is a modality, not a single product. Databricks manages the compute in its own account, it starts in seconds, it autoscales, and you pay only for what you use, with no idle cost. Serverless is available for sequel warehouses, for jobs, for notebooks, and for pipelines. The trade-off is the same one from the architecture section. With serverless you give up some network control, because it runs in Databricks' account, and in return you get instant start and zero cluster management. For the exam: a sequel warehouse is compute for sequel and business intelligence; serverless is the fast-start, Databricks-managed option, available across sequel, jobs, notebooks, and pipelines.",
}
