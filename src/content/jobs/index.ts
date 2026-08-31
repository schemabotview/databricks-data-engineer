import type { Course } from '../types'
import { whatIsAJob } from './01-what-is-a-job'
import { theDag } from './02-the-dag'
import { taskTypes } from './03-task-types'
import { controlFlow } from './04-control-flow'
import { triggers } from './05-triggers'
import { jobComputeSection } from './06-job-compute'
import { parameters } from './07-parameters'
import { notifications } from './08-notifications'
import { repairRerun } from './09-repair-rerun'
import { definingAJob } from './10-defining-a-job'

// jobs — orchestration, and the exam's third-heaviest domain (16%). Ten sections built around one
// worked example, the bank's nightly job: the vocabulary and the DAG, task types and control flow,
// triggers and per-task compute, parameters, notifications, monitoring and repair — closing on the
// YAML shape that course 7 then ships through a bundle. Course COMPLETE.
export const jobs: Course = {
  id: 'jobs',
  title: 'Lakeflow Jobs — Orchestration & Control Flow',
  sections: [
    whatIsAJob,
    theDag,
    taskTypes,
    controlFlow,
    triggers,
    jobComputeSection,
    parameters,
    notifications,
    repairRerun,
    definingAJob,
  ],
}
