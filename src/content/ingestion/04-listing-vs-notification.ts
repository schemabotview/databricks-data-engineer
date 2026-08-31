import type { Section } from '../types'

export const listingVsNotification: Section = {
  id: 'listing-vs-notification',
  title: 'Directory listing vs. file notification',
  scene: 'auto-loader-modes',
  slide: `## Listing vs. notification

Two ways to discover new files — a cost-and-scale trade.

### Directory listing (the default)
- Lists the source directory each micro-batch and diffs it against what's processed
- Works on **any cloud**, needs **no extra resources** — nothing to set up
- Bottoms out at **millions of files** in one directory, where the listing itself becomes the bottleneck

### File notification
- Subscribes to a managed event queue — **SQS + SNS**, **Event Grid**, **Pub/Sub**
- The cloud emits an event as each file lands; Auto Loader reads only that file — **no listing**, scaling to **billions**
- The trade: it needs IAM permission to create and manage the queue, and you pay for the queue. Set \`cloudFiles.useNotifications = true\`

**Exam:** up to millions → listing is fine; hundreds of millions or high-cardinality partition dirs → **file notification**.`,
  narration:
    "Auto Loader — directory listing versus file notification mode. Auto Loader has two different ways to discover new files, and choosing between them is a cost-and-scale trade. Directory listing mode is the default. On each micro-batch, Auto Loader lists the source directory and diffs it against what it has already processed. It works on any cloud, and it needs no extra resources — nothing to set up. Its limit shows up at millions of files in a single directory, where the listing operation itself becomes the bottleneck. File notification mode takes a different approach. Auto Loader subscribes to a managed event queue — that's S-Q-S plus S-N-S on A-W-S, Event Grid on Azure, or Pub/Sub on Google Cloud. The cloud emits an event the moment each file lands, and Auto Loader consumes that event and reads only that one file — no listing at all. This scales to billions of files. The trade-off: Auto Loader now needs I-A-M permission to create and manage that queue, and you pay for the queue. You turn it on with the option cloud-files-dot-use-notifications equals true. So here's the rule of thumb the exam wants. If you have anywhere from a few files up to millions in the directory, directory listing is perfectly fine. Once you're into hundreds of millions or billions of files — or partition directories with very high cardinality — switch to file notification mode.",
}
