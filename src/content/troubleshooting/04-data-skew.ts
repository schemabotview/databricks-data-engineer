import type { Section } from '../types'

export const dataSkew: Section = {
  id: 'data-skew',
  title: 'Data skew',
  scene: 'data-skew',
  slide: `## Data skew

**The symptom, as the UI shows it** — and the exam describes it almost word for word. Stage duration 25 minutes. Of 200 tasks, **199 finished in 30 seconds** and one is still running at **24 minutes**. Task summary: median shuffle read **400 MB**, max **5 GB**.

**Diagnosis:** the join or aggregation key is unbalanced. One \`customer_id\` — a corporate account with 50 million transactions — has 100× the rows of the median. After the shuffle they all land on **one** task, which holds up the entire stage while everything else sits idle.

### Three remedies, in the order the exam expects
1. **AQE skew-join** — detects oversized partitions at runtime, splits them, joins each independently. **Zero code change**
2. **Broadcast** the small side, if it fits — eliminates the shuffle entirely (course 4)
3. **Salt the key** — random \`0..N-1\`, join, aggregate the salt away. Heavier surgery

**~99% of the time the answer is option 1.** Reach for salting only when a question explicitly rules AQE out.`,
  narration:
    "Data skew — how to spot it, and how to fix it. Let's start with the symptom exactly as it appears in the U-I, because the exam describes it almost word for word. Stage duration: twenty-five minutes. Of two hundred tasks, a hundred and ninety-nine finished in thirty seconds — but one task is still running at twenty-four minutes. And the task summary shows a median shuffle read of four hundred megabytes, but a max of five gigabytes. Here's the diagnosis. The join or aggregation key is unbalanced. One customer-i-d — say a corporate customer with fifty million transactions — has a hundred times the rows of the median customer. After the shuffle, all of those rows land on a single executor task, and that one giant task holds up the entire stage while everything else sits idle. Now the three remedies, in the order the exam expects you to try them. First, enable A-Q-E skew-join. This is the recommended answer for almost every exam question on skew. A-Q-E detects the oversized partitions at runtime, splits them into smaller sub-partitions, and joins each one independently — with zero code change. You just set adaptive-enabled and adaptive-skew-join-enabled to true. Second, broadcast the small side, if it fits in driver memory. That eliminates the shuffle entirely — we covered it back in module four. Third, salt the join key, when A-Q-E isn't enough. You add a random zero-to-N-minus-one value to the key, join on it, then aggregate the salt away. It's heavier surgery, so you keep it for when A-Q-E has genuinely been tried and isn't sufficient. And the bottom line: the exam answer, about ninety-nine percent of the time, is option one — enable A-Q-E skew-join. The official sample question names exactly that. Reach for salting only when a question explicitly rules A-Q-E out.",
}
