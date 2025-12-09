import type { InputFile } from '$lib/input'
import { parsePoints, pointInPolygon } from '$lib/point'
import type { Day } from '$types/day'
export default {
	part1,
	part2,
} satisfies Day

type Rectangle = [number, number, number, number, number]

function part1(inputFile: InputFile) {
	const tiles = parsePoints(inputFile.lines(), 2)

	let result = 0
	for (let f = 0; f < tiles.length; f++) {
		const from = tiles[f]

		for (let t = f + 1; t < tiles.length; t++) {
			const to = tiles[t]

			const area =
				(Math.abs(to[0] - from[0]) + 1) * (Math.abs(to[1] - from[1]) + 1)
			if (area > result) result = area
		}
	}

	return result
}

function part2(inputFile: InputFile) {
	const tiles = parsePoints(inputFile.lines(), 2)
	const rectangles = new Array<Rectangle>(
		(tiles.length * (tiles.length - 1)) / 2,
	)

	let i = 0
	for (let f = 0; f < tiles.length; f++) {
		const from = tiles[f]
		for (let t = f + 1; t < tiles.length; t++) {
			const to = tiles[t]

			const xMin = Math.min(from[0], to[0])
			const xMax = Math.max(from[0], to[0])
			const yMin = Math.min(from[1], to[1])
			const yMax = Math.max(from[1], to[1])

			const area = (xMax - xMin + 1) * (yMax - yMin + 1)
			rectangles[i++] = [xMin, xMax, yMin, yMax, area]
		}
	}

	rectangles.sort((a, b) => b[4] - a[4])

	for (const rectangle of rectangles) {
		const [rxMin, rxMax, ryMin, ryMax, area] = rectangle

		let ok = true
		for (let f = 0, t = tiles.length - 1; f < tiles.length; t = f++) {
			const from = tiles[f]
			const to = tiles[t]

			const xOverlap = rxMin < from[0] && from[0] < rxMax
			const yOverlap = ryMin < from[1] && from[1] < ryMax

			if (xOverlap && yOverlap) {
				ok = false
				break
			}

			const yMin = Math.min(from[1], to[1])
			const yMax = Math.max(from[1], to[1])

			if (xOverlap && yMin < ryMax && yMax > ryMin) {
				ok = false
				break
			}

			const xMin = Math.min(from[0], to[0])
			const xMax = Math.max(from[0], to[0])
			// I wrote min here ^. Absolute tragedy.

			if (yOverlap && xMin < rxMax && xMax > rxMin) {
				ok = false
				break
			}
		}

		// The additional check is not necessary for the given input
		if (ok && pointInPolygon([rxMin + 1, ryMin + 1], tiles)) return area
	}
}
