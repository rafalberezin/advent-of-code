import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

// Is it just me or is the hardest part
// of this puzzle understanding what
// needs to be done? (part 1 at least)

type JunctionBoxID = number
type Distance = number
type Circuit = JunctionBoxID[]
type Point3D = [number, number, number]
type ConnectionWithDistance = [JunctionBoxID, JunctionBoxID, Distance]

const MAX_CONNECTIONS_INPUT = 1000
const MAX_CONNECTIONS_EXAMPLE = 10

function part1(inputFile: InputFile) {
	const junctionBoxes = parsePoints3D(inputFile)
	const maxConnections = inputFile.isExample()
		? MAX_CONNECTIONS_EXAMPLE
		: MAX_CONNECTIONS_INPUT

	const connections = getConnectionsSortedByDistance(junctionBoxes)
	const circuits: Circuit[] = []

	for (const connection of connections.slice(0, maxConnections)) {
		connect(circuits, connection)
	}

	circuits.sort((a, b) => b.length - a.length)
	return circuits[0].length * circuits[1].length * circuits[2].length
}

function part2(inputFile: InputFile) {
	const junctionBoxes = parsePoints3D(inputFile)
	const connections = getConnectionsSortedByDistance(junctionBoxes)
	const circuits: Circuit[] = []

	let lastConnection = connections[0]
	for (const connection of connections) {
		if (circuits.length === 1 && circuits[0].length === junctionBoxes.length) {
			return (
				junctionBoxes[lastConnection[0]][0] *
				junctionBoxes[lastConnection[1]][0]
			)
		}

		lastConnection = connection
		connect(circuits, connection)
	}

	throw new Error('could not connect all junction boxes for some reason')
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

function getConnectionsSortedByDistance(positions: Point3D[]): Point3D[] {
	const distances: ConnectionWithDistance[] = []

	for (let i = 0; i < positions.length; i++) {
		const from = positions[i]
		for (let j = i + 1; j < positions.length; j++) {
			const to = positions[j]
			const distSquared =
				(to[0] - from[0]) ** 2 + (to[1] - from[1]) ** 2 + (to[2] - from[2]) ** 2
			distances.push([i, j, distSquared])
		}
	}
	distances.sort((a, b) => a[2] - b[2])

	return distances
}

function connect(circuits: Circuit[], connection: Point3D) {
	const [from, to] = connection

	const fromCircuitId = circuits.findIndex(circuit => circuit.includes(from))
	const toCircuitId = circuits.findIndex(circuit => circuit.includes(to))
	const fromCircuit = circuits[fromCircuitId]
	const toCircuit = circuits[toCircuitId]

	if (fromCircuitId >= 0) {
		if (fromCircuit.includes(to)) return
		if (toCircuitId === -1) return fromCircuit.push(to)

		circuits[fromCircuitId] = fromCircuit.concat(toCircuit)
		circuits.splice(toCircuitId, 1)

		return
	}

	if (toCircuitId === -1) return circuits.push([from, to])

	if (!toCircuit.includes(from)) toCircuit.push(from)
}
