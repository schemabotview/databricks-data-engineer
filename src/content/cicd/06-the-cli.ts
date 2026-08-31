import type { Section } from '../types'

export const theCli: Section = {
  id: 'the-cli',
  title: 'The Databricks CLI — bundle verbs',
  scene: 'code-cli',
  slide: `## The Databricks CLI

Four subcommands cover the entire bundle workflow.

- **\`bundle validate -t <target>\`** — parses the manifest, resolves that target's variables, checks references, and emits the fully-resolved JSON it *would* send. The **dry run / lint**. Run it locally first, and in CI on every PR
- **\`bundle deploy -t <target>\`** — uploads source files, then creates or updates every resource so the workspace **matches the manifest**. **Idempotent** — re-deploying an unchanged bundle is a no-op
- **\`bundle run <key> -t <target>\`** — a one-off run of one job or pipeline, tailing output. The CLI's *"Run now"*
- **\`bundle destroy -t <target>\`** — removes everything the bundle owns. Careful — but exactly right for tearing down ephemeral test environments

**Auth:** OAuth user login (local) · OAuth M2M service principal (CI) · PAT (legacy).

**Exam:** *"parses the manifest, resolves variables, emits the JSON"* → **\`validate\`**. Not deploy, not init, not run.`,
  narration:
    "The Databricks C-L-I — bundle validate, deploy, run, and destroy. Four subcommands cover the entire bundle workflow, so let's take them one at a time. Bundle-validate, with a target flag, parses the manifest, resolves the variables for that target, checks all the references, and emits the fully-resolved J-S-O-N that would be sent to the A-P-I. It's the dry-run, the lint step. You run it first locally, and you run it in C-I on every pull request. Bundle-deploy uploads your notebooks and source files, then creates or updates every resource so the workspace matches the manifest. And crucially it's idempotent — re-deploying an unchanged bundle is a no-op, so it's safe to run repeatedly. Bundle-run, with a resource key, kicks off a one-off run of a specific job or pipeline and tails its output. It's the C-L-I equivalent of clicking \"Run now\" in the U-I. And bundle-destroy removes all the resources the bundle owns from the target. Use it carefully — but it's exactly right in C-I for tearing down ephemeral test environments. A typical local loop is just those first three in order: validate against dev, deploy to dev, then run the nightly job on dev. On auth, the C-L-I authenticates three ways. An OAuth user login — databricks-auth-login — for local development. An OAuth machine-to-machine service-principal token in C-I, set through databricks-host plus client-id and client-secret. Or a P-A-T, a personal access token — the older pattern, still works, but less preferred. And here's the exam's command question, which is almost always phrased the same way: which command parses the manifest, resolves variables, checks references, and emits the J-S-O-N it would send? That's validate. Not deploy, not init, not run.",
}
