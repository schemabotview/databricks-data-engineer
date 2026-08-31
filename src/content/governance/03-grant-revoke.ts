import type { Section } from '../types'

export const grantRevoke: Section = {
  id: 'grant-revoke',
  title: 'GRANT / REVOKE / DENY',
  scene: 'code-grants',
  slide: `## GRANT / REVOKE / DENY

Three SQL verbs, three distinct roles.

- **\`GRANT\`** adds a privilege. The practical pattern walks the hierarchy **top-down**: \`USE CATALOG\` on the catalog, \`USE SCHEMA\` on the schema, then \`SELECT\` on the table. All three together are what actually let a group read
- **\`REVOKE\`** removes a privilege you granted earlier — it undoes a grant
- **\`DENY\`** explicitly blocks, even when another grant would allow it

### The precedence rule
**\`DENY\` beats \`GRANT\`.** Granted \`SELECT\` on the whole catalog but denied it on one table? They read everything **except** that table. DENY is your surgical exception on top of a broad grant.

### Principals
Users · **groups** · service principals (jobs and CI/CD, from course 7).

**Grant to groups, never individuals.** Group grants survive joiners and leavers; per-user grants rot into an unauditable mess nobody dares clean up.`,
  narration:
    "Grant, revoke, and deny — the three statements you use on principals. Three S-Q-L verbs, three distinct roles in the system. Grant adds a privilege. And the practical pattern is to walk the hierarchy top-down: grant use-catalog on the catalog, then use-schema on the schema, then select on the specific table. Those three together are what actually let a group read a table — remember the gating privileges from the hierarchy section. Revoke removes a privilege that was explicitly granted earlier. So revoke-select-on-table takes back a select you previously handed out. It undoes a grant. Deny is the interesting one. Deny explicitly blocks a privilege, even if some other grant would have allowed it. And that leads to the precedence rule the exam loves to test: deny beats grant. So suppose you granted select on the whole catalog fintech-dev, but you also denied select on the one table silver-dot-customers. The deny wins for that table. The analyst can read everything in the catalog except that one table. Deny is your surgical exception on top of a broad grant. There are three principal types you grant to. Users — human accounts. Groups — preferred for production; you manage the membership in your identity provider, and you grant to the group name in Unity Catalog. And service principals — non-human identities for jobs and C-I-C-D, which we met in module seven. And the best practice the exam consistently rewards: grant to groups, never to individual users. Group grants survive joiners and leavers — someone joins the analysts group and instantly has the right access; someone leaves and loses it. Per-user grants, by contrast, rot over time into an unauditable mess that nobody dares to clean up.",
}
