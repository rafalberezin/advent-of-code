export enum Break {
	Inner,
	Outer,
}
export function forEachGrid<T>(
	grid: T[][],
	callback: (row: number, col: number, cell: T) => Break | void,
) {
	outer: for (let row = 0; row < grid.length; row++) {
		const rowData = grid[row]
		for (let col = 0; col < rowData.length; col++) {
			switch (callback(row, col, rowData[col])) {
				case Break.Inner:
					break
				case Break.Outer:
					break outer
			}
		}
	}
}

export type AdjacentPattern = [number, number][]

export const ADJACENT_4: AdjacentPattern = [
	[-1, 0],
	[0, -1],
	[0, 1],
	[1, 0],
]

export const DIAGONAL_4: AdjacentPattern = [
	[-1, -1],
	[-1, 1],
	[1, -1],
	[1, 1],
]

export const ADJACENT_8: AdjacentPattern = [...ADJACENT_4, ...DIAGONAL_4]

export function countAdjacent<T>(
	grid: T[][],
	row: number,
	col: number,
	target: T,
	pattern: AdjacentPattern,
): number {
	let count = 0
	const colLength = grid[0].length

	for (const pos of pattern) {
		const r = row + pos[0]
		const c = col + pos[1]
		if (
			r >= 0 &&
			r < grid.length &&
			c >= 0 &&
			c < colLength &&
			grid[r][c] === target
		)
			count++
	}

	return count
}
