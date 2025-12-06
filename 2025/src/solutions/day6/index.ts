import { transpose } from '$lib/grid'
import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

function part1(inputFile: InputFile) {
	const lines = inputFile.lines()
	const columnSize = lines.length

	const operations = lines[columnSize - 1].split(/\s+/)
	const parsed = lines.slice(0, columnSize - 1).map(line =>
		line
			.trim()
			.split(/\s+/)
			.map(str => {
				const num = parseInt(str)
				if (Number.isNaN(num)) throw new Error(`could not parse int: ${str}`)
				return num
			}),
	)
	const values = transpose(parsed)

	return operations
		.map((op, i) =>
			op === '+'
				? values[i].reduce((acc, val) => acc + val, 0)
				: values[i].reduce((acc, val) => acc * val, 1),
		)
		.reduce((sum, val) => sum + val, 0)
}

function part2(inputFile: InputFile) {
	const lines = inputFile.lines()
	const columnSize = lines.length

	const operations = lines[columnSize - 1]
	const values = transpose(
		lines.slice(0, columnSize - 1).map(line => line.split('')),
	).map(line => line.join('').trim())

	let result = 0
	let opAdd = operations[0] === '+'
	let acc = opAdd ? 0 : 1

	for (let i = 0; i < values.length; i++) {
		const val = values[i]

		if (val === '') {
			result += acc
			opAdd = operations[i + 1] === '+'
			acc = opAdd ? 0 : 1
			continue
		}

		const num = parseInt(val)
		if (Number.isNaN(num)) throw new Error(`could not parse int: ${val}`)

		if (opAdd) acc += num
		else acc *= num
	}

	result += acc
	return result
}
