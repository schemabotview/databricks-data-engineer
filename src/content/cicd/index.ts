import type { Course } from '../types'
import { theProblem } from './01-the-problem'
import { gitFolders } from './02-git-folders'
import { bundleManifest } from './03-bundle-manifest'
import { resources } from './04-resources'
import { variables } from './05-variables'
import { theCli } from './06-the-cli'
import { promotion } from './07-promotion'
import { runAs } from './08-run-as'
import { bundleScope } from './09-bundle-scope'

// cicd — shipping the work of courses 5 and 6, and exam domain 5 (10%). Nine sections: the problem
// bundles solve, Git Folders, then the bundle code block (§3–§6: manifest · resources · per-target
// variables · the CLI), closing on the promotion pipeline, run-as identity, and the code/infra
// boundary. Course COMPLETE.
export const cicd: Course = {
  id: 'cicd',
  title: 'Git Folders, Automation Bundles & the CLI',
  sections: [
    theProblem,
    gitFolders,
    bundleManifest,
    resources,
    variables,
    theCli,
    promotion,
    runAs,
    bundleScope,
  ],
}
