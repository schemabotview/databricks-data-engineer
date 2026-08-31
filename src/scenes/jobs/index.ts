import type { Scene } from '../../render-engine'
import { jobAnatomy } from './job-anatomy'
import { jobDag } from './job-dag'
import { taskTypes } from './task-types'
import { controlFlow } from './control-flow'
import { triggers } from './triggers'
import { jobCompute } from './job-compute'
import { notifications } from './notifications'
import { repairRerun } from './repair-rerun'
import { codeParameters, codeJobYaml } from './code-scenes'

// The jobs course's ten scenes, in syllabus order: the vocabulary · the DAG (the one scene that IS
// the thing it describes) · task types · control flow · triggers · per-task compute · the parameters
// card · notifications · monitoring and repair · the YAML shape that course 7 then ships.
export const jobsScenes: Scene[] = [
  jobAnatomy,
  jobDag,
  taskTypes,
  controlFlow,
  triggers,
  jobCompute,
  codeParameters,
  notifications,
  repairRerun,
  codeJobYaml,
]
