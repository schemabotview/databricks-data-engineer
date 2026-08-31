import type { Section } from '../types'

export const costModel: Section = {
  id: 'cost-model',
  title: 'Cost model — DBUs & two knobs',
  scene: 'cost-model',
  slide: `## Cost model — DBUs & two knobs

Databricks bills in **DBUs (Databricks Units)** — a normalized measure of the processing a cluster consumes per hour.

Your bill has two parts: the **DBUs** you pay Databricks (the rate depends on workload type and tier) plus the **cloud VM cost** you pay your provider. Serverless bundles both into one price.

Job clusters bill at a **lower DBU rate** than all-purpose — so the compute advice from the last section is also cost advice.

### Two knobs keep the bill down

1. **Autoscaling** — a cluster adds and removes workers between a **min** and **max** based on load, so you pay for what the work actually needs instead of a fixed, oversized cluster
2. **Auto-termination** — an idle cluster shuts down after N minutes; job clusters end with their run, and serverless scales all the way to **zero**`,
  narration:
    "The cost model: D-B-Us, autoscaling, and auto-termination. Databricks bills in D-B-Us, databricks units, a normalized measure of the processing a cluster consumes per hour. Your total bill is two parts: the D-B-Us you pay Databricks, where the rate depends on the workload type and tier, plus the underlying cloud V-M cost you pay your cloud provider. Serverless bundles both into one price. The D-B-U rate varies by workload, which is why the earlier advice about compute choice is also cost advice. Job clusters bill at a lower rate than all-purpose clusters, so running production on job clusters is both cleaner and cheaper. Two knobs keep that bill under control. The first is autoscaling. A cluster adds and removes workers between a minimum and a maximum based on load, so you pay for what the workload actually needs, instead of a fixed, oversized cluster. The second is auto-termination. An idle all-purpose cluster shuts down after a set number of minutes with no activity, so you stop paying for compute nobody is using. Job clusters terminate automatically at the end of their run, and serverless scales all the way to zero when idle. For the exam: the D-B-U is the billing unit; job D-B-Us are cheaper than all-purpose; and autoscaling and auto-termination are the two levers that stop you from paying for idle or oversized compute.",
}
