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

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}

// The slug for a section is `<courseId>-<sectionId>` — section IS the unit (one slide, one
// narration), so no trailing beat index.
export function slugOf(course: Course, section: Section): string {
  return `${course.id}-${section.id}`
}

export function allSections(course: Course): { section: Section; slug: string }[] {
  return course.sections.map((section) => ({ section, slug: slugOf(course, section) }))
}
