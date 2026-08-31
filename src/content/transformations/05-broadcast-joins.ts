import type { Section } from '../types'

export const broadcastJoins: Section = {
  id: 'broadcast-joins',
  title: 'Broadcast joins & join performance',
  scene: 'broadcast-join',
  slide: `## Broadcast joins

A **normal join shuffles both sides** by the join key — every executor sends rows across the network so matching keys land together. Once both sides are large, that shuffle is the most expensive thing in the job.

A **broadcast join** sidesteps it: Spark ships a full copy of the **smaller** side to every executor, so the big side never moves. **No shuffle.**

### Auto vs. forced
Spark auto-broadcasts when a side is under **\`spark.sql.autoBroadcastJoinThreshold\`** (default **10 MB**). Force it with \`broadcast(small_df)\` in Python, or a \`/*+ BROADCAST(c) */\` hint in SQL.

### Watch out
Broadcasting a side **larger than driver memory** blows the driver — cap the threshold near your largest real "small" table. And **AQE** (course 8) can promote sort-merge → broadcast **at runtime** on real statistics.`,
  narration:
    "Broadcast joins, and join performance. Here's the problem a broadcast join solves. A normal join shuffles both sides by the join key — every executor sends its rows across the network so that matching keys land together. That's fine for small tables, but once both sides are large, that shuffle is the single most expensive thing in your job. A broadcast join sidesteps it entirely. Instead of moving both sides, Spark ships the smaller side — a full copy — to every executor. Now the big side never moves at all. No shuffle, no network storm. Spark does this automatically when one side's estimated size is below a threshold called spark-dot-s-q-l-dot-auto-broadcast-join-threshold. The default is ten megabytes, though teams often bump it to a hundred megabytes or more. So joining fifty billion card-transaction rows against a five-megabyte merchant-categories lookup auto-broadcasts without you doing anything. When the statistics are stale, or you simply know better than the optimiser, you can force it. In Python you wrap the small side in the broadcast function. In S-Q-L you use a broadcast hint naming the small table. But this can backfire. If you broadcast a side that's larger than driver memory, you blow the driver — so cap that threshold at the order of the largest \"small\" table you actually have. Don't broadcast something huge. And there's a safety net: Adaptive Query Execution, A-Q-E, which we cover in module eight. It can promote a sort-merge join to a broadcast join at runtime, once it sees the real partition sizes — even when the planner's static statistics got it wrong. So the two levers on join performance are: shrink the shuffle by broadcasting the small side, and let A-Q-E re-plan on the actual data.",
}
