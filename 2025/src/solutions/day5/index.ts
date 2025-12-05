import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

type NumberRange = [number, number]

function part1(inputFile: InputFile) {
	const lines = inputFile.lines()
	const empty = lines.indexOf('')

	const ingredients = lines
		.slice(empty + 1)
		.map(id => parseInt(id))
		.sort((a, b) => a - b)

	let ranges = parseRanges(lines.slice(0, empty))
	ranges = sortAndCollapseRanges(ranges)

	let result = 0

	let ingredientI = 0
	let rangeI = 0
	while (ingredientI < ingredients.length && rangeI < ranges.length) {
		let id = ingredients[ingredientI]
		let range = ranges[rangeI]

		if (id > range[1]) {
			rangeI++
			continue
		}

		if (id > range[0]) result++
		ingredientI++
	}

	return result
}

function part2(inputFile: InputFile) {
	const lines = inputFile.lines()
	const empty = lines.indexOf('')

	let ranges = parseRanges(lines.slice(0, empty))
	ranges = sortAndCollapseRanges(ranges)

	let result = 0
	for (const range of ranges) result += range[1] - range[0] + 1

	return result
}

function parseRanges(lines: string[]): NumberRange[] {
	return lines.map(range => {
		const [minStr, maxStr] = range.split('-')

		const min = parseInt(minStr)
		if (Number.isNaN(min)) {
			throw new Error(`could not parse int: ${minStr}`)
		}
		const max = parseInt(maxStr)
		if (Number.isNaN(max)) {
			throw new Error(`could not parse int: ${maxStr}`)
		}

		return [min, max]
	})
}

function sortAndCollapseRanges(ranges: NumberRange[]): NumberRange[] {
	ranges.sort((a, b) => {
		const res = a[0] - b[0]
		return res === 0 ? a[1] - b[1] : res
	})

	return ranges.reduce((collapsed, next) => {
		const last = collapsed[collapsed.length - 1]

		if (last === undefined || last[1] < next[0]) {
			collapsed.push(next)
		} else if (last[1] < next[1]) {
			last[1] = next[1]
		}

		return collapsed
	}, [] as NumberRange[])
}
