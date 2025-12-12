import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

function part1(inputFile: InputFile) {
	if (inputFile.isExample()) {
		throw new Error(
			"Sorry no example this time.\nI didn't really solve the puzzle.\nIt just happened to work with 2 simple early filters for my input.\nI wonder if that's intentional.",
		)
	}

	const dataGroups = inputFile
		.string()
		.split('\n\n')
		.map(group => group.split('\n'))

	const sizes = dataGroups.slice(0, dataGroups.length - 1).map(data => {
		let size = 0
		for (let row = 1; row < data.length; row++) {
			const rowData = data[row]
			for (let col = 0; col < rowData.length; col++) {
				if (rowData[col] === '#') size++
			}
		}
		return size
	})

	let result = 0
	for (const line of dataGroups[dataGroups.length - 1]) {
		const [sizeStr, presentsStr] = line.split(': ')
		const [width, height] = sizeStr.split('x').map(Number)
		const presents = presentsStr.split(' ').map(Number)

		if (canPack(width, height, presents, sizes)) result++
	}
	return result
}

function canPack(
	width: number,
	height: number,
	presents: number[],
	sizes: number[],
): boolean {
	const size = width * height
	const requiredSize = presents
		.map((count, i) => count * sizes[i])
		.reduce((sum, size) => sum + size, 0)

	if (requiredSize > size) return false

	const spreadCoverageSize = presents.reduce((sum, count) => sum + count, 0) * 9
	if (spreadCoverageSize <= size) return true

	throw new Error(
		"This error never get's thrown for me.\nIs that intentional? \nEither way, I might actually come back later to solve this properly.",
	)
}

function part2() {
	return 'Now you just need to get all the previous stars!'
}
