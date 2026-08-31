import type { Scene } from '../../render-engine'
import { cicdProblem } from './cicd-problem'
import { gitFolders } from './git-folders'
import { promotionFlow } from './promotion-flow'
import { runAsIdentity } from './run-as-identity'
import { bundleScope } from './bundle-scope'
import { codeDatabricksYml, codeResources, codeVariables, codeCli } from './code-scenes'

// The cicd course's nine scenes, in syllabus order: the problem bundles solve · Git Folders · the
// bundle code block (§3–§6: the manifest, resources, per-target variables, the CLI) · the promotion
// pipeline · run-as identity · what belongs in a bundle at all.
export const cicdScenes: Scene[] = [
  cicdProblem,
  gitFolders,
  codeDatabricksYml,
  codeResources,
  codeVariables,
  codeCli,
  promotionFlow,
  runAsIdentity,
  bundleScope,
]
