import type { Scene } from '../render-engine'
import { platformScenes } from './platform'
import { deltaUcScenes } from './delta-uc'
import { ingestionScenes } from './ingestion'
import { transformationsScenes } from './transformations'
import { modelingScenes } from './modeling'
import { jobsScenes } from './jobs'
import { cicdScenes } from './cicd'
import { troubleshootingScenes } from './troubleshooting'
import { governanceScenes } from './governance'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as they're authored, one slice at a time.
const ALL: Scene[] = [...platformScenes, ...deltaUcScenes, ...ingestionScenes, ...transformationsScenes, ...modelingScenes, ...jobsScenes, ...cicdScenes, ...troubleshootingScenes, ...governanceScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
