import type { Section } from '../types'

export const variables: Section = {
  id: 'variables',
  title: 'Variables & environment overrides',
  scene: 'code-variables',
  slide: `## Variables & overrides

Here's the payoff of the whole bundle model. The **same** \`databricks.yml\` and the **same** resource files deploy three genuinely different sets of behaviour — and the mechanism is just **variable resolution per target**.

Across environments: \`catalog\` resolves to \`fintech_dev\` / \`fintech_test\` / \`fintech_prod\`. \`node_type_id\` is small in dev and test, bigger in prod. \`mode\` is \`development\` then \`production\`. \`run_as\` is the developer, then a **service principal**. Even the schedule can differ.

### The escape hatch
At target level you can override **any resource field**, not only declared variables — the schedule outright, the cluster size, the email recipients. Variables are the common case; full field overrides are the escape hatch.

**Exam:** *"promote the same codebase to dev/test/prod with different catalogs and cluster sizes"* → **variables + targets**. The structure is written once; **you never fork the code per environment.**`,
  narration:
    "Variables and environment overrides — one codebase, three behaviours. Here's the payoff of the whole bundle model. The same databricks-dot-y-m-l, and the same resource files, deploy three genuinely different sets of behaviour — and the mechanism is simply variable resolution per target. Walk the table across environments. The catalog variable resolves to fintech-dev in dev, fintech-test in test, and fintech-prod in prod. The node-type-id is a small i3-xlarge in dev and test, but a bigger i3-2xlarge in prod, because prod carries the real load. Mode is development in dev and test, but production in prod. Run-as is the developer in dev and test, but a service principal in prod. And even the schedule can differ — maybe every four hours in the lower environments, but a firm nightly two a-m in prod. Now, an important detail about overrides: at the target level you can override any resource field, not just declared variables. So the prod target can replace the schedule outright, or the cluster size, or the email recipients — anything the resource declares. Variables are the common case; full field overrides are the escape hatch. And here's the exam pattern, which is almost always the same shape: \"a team needs to promote the same codebase to dev, test, and prod with different catalog names and cluster sizes.\" The answer is bundle variables plus targets. One source tree, per-target overrides. You never fork the code per environment — you override values. That's the essence of the bundle model. The structure — the D-A-G, the tasks, the pipeline — is written once. Only the values that genuinely must differ — catalog, size, identity, cadence — vary per target, declaratively, in one file, under version control.",
}
