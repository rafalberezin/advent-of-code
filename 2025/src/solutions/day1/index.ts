import type { InputFile } from '$lib/input'
import { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

type Rotation = number
const START = 50

function part1(inputFile: InputFile) {
	const rotations = getRotations(inputFile)

	let pointer = START
	let result = 0

	rotations.forEach(rotation => {
		pointer += rotation

		if (pointer > 99 || pointer < 0) pointer %= 100
		if (pointer < 0) pointer += 100
		if (pointer === 0) result++
	})

	return result
}

function part2(inputFile: InputFile) {
	const rotations = getRotations(inputFile)

	let pointer = START
	let result = 0

	rotations.forEach(rotation => {
		const atZero = pointer === 0
		pointer += rotation

		if (pointer > 99) {
			result += Math.floor(pointer / 100)
			pointer %= 100
			return
		}

		if (pointer < 0) {
			result -= Math.floor(pointer / 100)
			if (atZero) result--

			pointer %= 100
			if (pointer < 0) pointer += 100
		}

		if (pointer === 0) result++
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
