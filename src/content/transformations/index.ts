import type { Course } from '../types'
import { bronzeToSilver } from './01-bronze-to-silver'
import { cleaning } from './02-cleaning'
import { columnRowOps } from './03-column-row-ops'
import { joins } from './04-joins'
import { broadcastJoins } from './05-broadcast-joins'
import { unions } from './06-unions'
import { explode } from './07-explode'
import { aggregates } from './08-aggregates'
import { windowFunctions } from './09-window-functions'
import { tuningKnobs } from './10-tuning-knobs'
import { writingToSilver } from './11-writing-to-silver'

// transformations — bronze → silver with PySpark and Spark SQL, and half of the exam's heaviest
// domain (Transformation & Modeling, 22%). Eleven sections, seven of them code cards: the layer
// transform, cleaning and column/row verbs, the join family and broadcast, unions and explode,
// aggregates and windows, the tuning knobs, and the write. Course COMPLETE.
export const transformations: Course = {
  id: 'transformations',
  title: 'Transformations with PySpark & Spark SQL',
  sections: [
    bronzeToSilver,
    cleaning,
    columnRowOps,
    joins,
    broadcastJoins,
    unions,
    explode,
    aggregates,
    windowFunctions,
    tuningKnobs,
    writingToSilver,
  ],
}
