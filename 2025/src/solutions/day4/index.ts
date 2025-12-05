import { ADJACENT_8, countAdjacent, forEachGrid } from '$lib/grid'
import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

const PAPER_ROLL = '@'
const EMPTY = '.'

function part1(inputFile: InputFile) {
	const grid = inputFile.grid()

	let result = 0

	forEachGrid(grid, (row, col, cell) => {
		if (
			cell === PAPER_ROLL &&
			countAdjacent(grid, row, col, PAPER_ROLL, ADJACENT_8) < 4
		) {
			result++
		}
	})

	return result
}

function part2(inputFile: InputFile) {
	const grid = inputFile.grid()

	let result = 0
	let prev

	do {
		prev = result

		forEachGrid(grid, (row, col, cell) => {
			if (
				cell === PAPER_ROLL &&
				countAdjacent(grid, row, col, PAPER_ROLL, ADJACENT_8) < 4
			) {
				grid[row][col] = EMPTY
				result++
			}
		})
	} while (prev !== result)

	return result
}
