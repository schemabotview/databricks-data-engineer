import { platform } from './platform'
import { deltaUc } from './delta-uc'
import { ingestion } from './ingestion'
import { transformations } from './transformations'
import { modeling } from './modeling'
import { jobs } from './jobs'
import { cicd } from './cicd'
import { troubleshooting } from './troubleshooting'
import { governance } from './governance'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. Courses are added here as they're authored (slice by slice).
export const COURSES: Record<string, Course> = {
  [platform.id]: platform,
  [deltaUc.id]: deltaUc,
  [ingestion.id]: ingestion,
  [transformations.id]: transformations,
  [modeling.id]: modeling,
  [jobs.id]: jobs,
  [cicd.id]: cicd,
  [troubleshooting.id]: troubleshooting,
  [governance.id]: governance,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
