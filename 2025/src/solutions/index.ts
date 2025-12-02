import type { Day } from '$types/day'

import day1 from './day1'
import day2 from './day2'

const solutions: Record<`day${number}`, Day> = {
	day1,
	day2,
}

export default solutions
