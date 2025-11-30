import type { InputFile } from '../lib/input'

interface Day {
	part1: Solution
	part2: Solution
}

type Solution = (inputFile: InputFile) => any
