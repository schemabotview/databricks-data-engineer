import type { Scene } from '../../render-engine'
import { bronzeToSilver } from './bronze-to-silver'
import { joinTypes } from './join-types'
import { broadcastJoin } from './broadcast-join'
import { tuningKnobs } from './tuning-knobs'
import {
  codeCleaning,
  codeColumnRow,
  codeUnions,
  codeExplode,
  codeAggregates,
  codeWindows,
  codeWriteSilver,
} from './code-scenes'

// The transformations course's eleven scenes, in syllabus order. The most code-heavy course in the
// concept — seven cards to four diagrams — because these sections teach syntax you would type, while
// the four diagrams (the layer transform, the join families, broadcast, and the tuning knobs) teach
// a structure or a decision. See the repo CLAUDE.md for that split rule.
export const transformationsScenes: Scene[] = [
  bronzeToSilver,
  codeCleaning,
  codeColumnRow,
  joinTypes,
  broadcastJoin,
  codeUnions,
  codeExplode,
  codeAggregates,
  codeWindows,
  tuningKnobs,
  codeWriteSilver,
]
