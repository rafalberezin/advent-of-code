import { newDSU } from '$lib/dsu'
import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

// Is it just me or is the puzzle
// explanation slightly misleading?

interface ConnectionTable {
	from: Uint32Array
	to: Uint32Array
	distance: Float64Array
	index: Uint32Array
}

type Point3D = [number, number, number]

const MAX_CONNECTIONS_INPUT = 1000
const MAX_CONNECTIONS_EXAMPLE = 10

function part1(inputFile: InputFile) {
	const junctionBoxes = parsePoints3D(inputFile)
	const maxConnections = inputFile.isExample()
		? MAX_CONNECTIONS_EXAMPLE
		: MAX_CONNECTIONS_INPUT

	const connections = getConnectionsSortedByDistance(junctionBoxes)
	const circuits = newDSU(junctionBoxes.length)

	for (const i of connections.index.slice(0, maxConnections)) {
		circuits.union(connections.from[i], connections.to[i])
	}

	return circuits
		.roots()
		.map(root => circuits.size(root))
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((acc, val) => acc * val, 1)
}

function part2(inputFile: InputFile) {
	const junctionBoxes = parsePoints3D(inputFile)
	const connections = getConnectionsSortedByDistance(junctionBoxes)
	const circuits = newDSU(junctionBoxes.length)

	for (const i of connections.index) {
		const from = connections.from[i]
		const to = connections.to[i]

		circuits.union(connections.from[i], connections.to[i])

		if (circuits.size(0) === junctionBoxes.length) {
			return junctionBoxes[from][0] * junctionBoxes[to][0]
		}
	}
}

function parsePoints3D(inputFile: InputFile): Point3D[] {
	return inputFile.lines().map(line => {
		const nums = line.split(',')

		if (nums.length !== 3) {
			throw new Error(
				`expected 3 numbers in a line, got ${nums.length}: ${line}`,
			)
		}

		return nums.map(str => {
			const num = parseInt(str)
			if (Number.isNaN(num)) throw new Error(`could not parse int: ${str}`)
			return num
		}) as Point3D
	})
}

function getConnectionsSortedByDistance(positions: Point3D[]): ConnectionTable {
	const size = (positions.length * (positions.length - 1)) / 2

	const from = new Uint32Array(size)
	const to = new Uint32Array(size)
	const distance = new Float64Array(size)
	const index = new Uint32Array(size)

	let i = 0
	for (let f = 0; f < positions.length; f++) {
		const fromPoint = positions[f]

		for (let t = f + 1; t < positions.length; t++) {
			const toPoint = positions[t]

			const distanceSquared =
				(toPoint[0] - fromPoint[0]) ** 2 +
				(toPoint[1] - fromPoint[1]) ** 2 +
				(toPoint[2] - fromPoint[2]) ** 2

			from[i] = f
			to[i] = t
			distance[i] = distanceSquared
			index[i] = i++
		}
	}

	index.sort((a, b) => distance[a] - distance[b])

	return { from, to, distance, index }
}
