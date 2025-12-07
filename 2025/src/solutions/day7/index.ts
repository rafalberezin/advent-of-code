import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

const START = 'S'
const EMPTY = '.'

function part1(inputFile: InputFile) {
	let grid = inputFile.grid().filter(row => row.some(cell => cell !== EMPTY))
	const rowSize = grid[0].length

	let beams = new Set<number>()
	beams.add(grid[0].indexOf(START))

	let result = 0
	let row = 0
	while (++row < grid.length) {
		const newBeams = new Set<number>()

		for (const beam of beams.values()) {
			if (grid[row][beam] === EMPTY) {
				newBeams.add(beam)
				continue
			}

			if (beam > 0) newBeams.add(beam - 1)
			if (beam < rowSize - 1) newBeams.add(beam + 1)
			result++
		}

		beams = newBeams
	}

	return result
}

function part2(inputFile: InputFile) {
	const grid = inputFile.grid()
	return travel(grid, grid[0].length, 0, grid[0].indexOf(START), new Map())
}

function travel(
	grid: string[][],
	rowSize: number,
	row: number,
	col: number,
	cache: Map<number, number>,
): number {
	if (col < 0 || col >= rowSize) return 0

	while (++row < grid.length) {
		const cell = grid[row][col]
		if (cell === EMPTY) continue

		const id = row * rowSize + col
		const cached = cache.get(id)
		if (cached !== undefined) return cached

		const paths =
			travel(grid, rowSize, row, col - 1, cache) +
			travel(grid, rowSize, row, col + 1, cache)
		cache.set(id, paths)
		return paths
	}

	return 1
}
