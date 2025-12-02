import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

type Rotation = number
const START = 50

function part1(inputFile: InputFile) {
	const rotations = getRotations(inputFile)

	let dial = START
	let result = 0

	rotations.forEach(rotation => {
		dial += rotation

		if (dial > 99 || dial < 0) dial %= 100
		if (dial < 0) dial += 100
		if (dial === 0) result++
	})

	return result
}

function part2(inputFile: InputFile) {
	const rotations = getRotations(inputFile)

	let dial = START
	let result = 0

	rotations.forEach(rotation => {
		const atZero = dial === 0
		dial += rotation

		if (dial > 99) {
			result += Math.floor(dial / 100)
			dial %= 100
			return
		}

		if (dial < 0) {
			result -= Math.floor(dial / 100)
			if (atZero) result--

			dial %= 100
			if (dial < 0) dial += 100
		}

		if (dial === 0) result++
	})

	return result
}

function getRotations(inputFile: InputFile): Rotation[] {
	return inputFile.lines().map(line => {
		const distanceStr = line.slice(1)
		const distance = parseInt(distanceStr)
		if (Number.isNaN(distance)) {
			throw new Error(`could not parse int: ${distanceStr}`)
		}

		return line[0] === 'R' ? distance : -distance
	})
}
