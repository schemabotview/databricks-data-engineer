import type { Section } from '../types'

export const runAs: Section = {
  id: 'run-as',
  title: 'Run-as identity — SPs in non-dev',
  scene: 'run-as-identity',
  slide: `## Run-as identity

Bundles execute under an identity, and it helps to split that into **two distinct questions**, because the exam sometimes conflates them.

- **Who *deploys* the bundle?** The principal running \`bundle deploy\`. In CI, that's a **service principal** via OAuth machine-to-machine
- **Who *runs* the deployed resources?** Set by **\`run_as\`** on each target

### Best practice
**dev** → \`run_as\` the user (the developer's own identity). **test / prod** → a named **service principal**, so production jobs never depend on a human's account.

**Why insist?** A job that runs as a person breaks the day they leave the team, change roles, or have a token rotated. A service principal is a **stable, platform-owned, non-human identity**.

### The SP permission boundary
\`USE CATALOG\` + \`USE SCHEMA\` · \`SELECT\` / \`MODIFY\` on tables · \`CAN_MANAGE_RUN\` on jobs and pipelines · workspace folder permissions. Least privilege — grants in course 9.`,
  narration:
    "Run-as identity — and why non-dev environments run as service principals. Bundles execute under an identity, and it helps to split that into two distinct questions, because the exam sometimes conflates them. Question one: who deploys the bundle? That's the principal that runs bundle-deploy. In C-I, that's a service principal, authenticated via OAuth machine-to-machine. Question two: who runs the deployed resources — the jobs and pipelines once they exist? That's set by run-as on each target. The best practice the exam expects is straightforward. In dev, run-as is the user — the developer's own identity. In test and prod, run-as is a service principal, named explicitly, so that production jobs never depend on a human's account. Why insist on a service principal in prod? Because if a job runs as a person, it breaks the day that person leaves the team, changes roles, or has their token rotated. A service principal is a stable, non-human identity, owned by the platform itself. So whenever a question says \"a production job should not depend on any one engineer's credentials,\" the answer is: run it as a service principal. Now the permission boundary — what that service principal actually needs, on the things it touches. Use-catalog and use-schema on the catalogs and schemas. Select and modify on the tables. Can-manage-run on the bundle's jobs and pipelines. And workspace folder permissions for the path it deploys into. Module nine covers grant and revoke on all of these in detail. The takeaway here is just this: prod runs as a service principal, and that principal holds exactly the grants it needs — no more. Least privilege, applied to your deployment identity.",
}
