import type { Section } from '../types'

export const goldPatterns: Section = {
  id: 'gold-patterns',
  title: 'Modeling gold — what BI & ML want',
  scene: 'gold-patterns',
  slide: `## Modeling gold

Two patterns cover most gold tables, and you choose between them by **consumer**.

### Star schema — a fact plus conformed dimensions
\`fact_card_transactions\` with foreign keys out to \`dim_customer\`, \`dim_merchant\`, \`dim_date\`. Dimensions slowly change, so **SCD type 2** captures changes while preserving history. This is what **Power BI and Tableau** want — those tools are built to join facts to dimensions.

### Wide rollup (OBT) — one row per entity
\`customer_360\`: an id plus thirty-odd metrics inline. No joins, so it's easier for analysts, but pricier to refresh. This is what **ad-hoc analytics and ML feature engineering** want.

### The bank's gold layout
\`customer_360\` → **MV, hourly** · \`daily_card_volume\` → **streaming table** · \`dim_customer\` → **SCD 2** · \`fact_card_transactions\` → **SCD 1**.

**Match twice:** consumer → shape, and object → refresh pattern.`,
  narration:
    "Modeling gold — the patterns that B-I and M-L actually want. Two patterns cover most gold tables, and you choose between them by consumer — who's reading the table. The first is the star schema: a central fact surrounded by conformed dimensions. So you'd have gold-dot-fact-card-transactions, one row per transaction with foreign keys out to the dimensions, and then gold-dot-dim-customer, dim-merchant, and dim-date around it. Those dimensions usually slowly change — when a customer's city changes, you want S-C-D type two to capture the change while preserving the history, and apply-changes-into stored-as-S-C-D-type-two is exactly the right tool. Star schema is what Power B-I and Tableau dashboards want, because those tools are built to join facts to dimensions. The second is the wide rollup, also called O-B-T, or one big table: one row per business entity, with every interesting metric inline. Gold-dot-customer-360 is the example — customer-i-d plus thirty-odd rollup columns. It's easier for analysts because there are no joins, but it's more expensive to refresh. O-B-T is what ad-hoc analytics teams and M-L feature engineering want. Pulling the whole module together, here's the bank's gold layout. Customer-360 is a materialized view, refreshed hourly. Daily-card-volume is a streaming table, continuous. Dim-customer uses apply-changes-into with S-C-D type two, for history. And fact-card-transactions uses apply-changes-into with S-C-D type one. And the exam's angle is a double match. Match the consumer to the shape — B-I dashboards want a star schema, M-L features and ad-hoc want one big table. And match the object to the refresh pattern — materialized view for scheduled aggregation, streaming table for continuous, and apply-changes for C-D-C dimensions.",
}
