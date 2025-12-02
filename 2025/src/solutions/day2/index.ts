import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

interface IntRange {
	min: number
	max: number
}

function part1(inputFile: InputFile) {
	const ranges = getRanges(inputFile)

	let result = 0
	ranges.forEach(range => {
		let val = range.min
		while (val <= range.max) {
			const str = val.toString()
			if (str.length % 2 !== 0) {
				val = 10 ** str.length // skip over to next even digits number
				continue
			}

			const half = str.length / 2
			const left = str.substring(0, half)
			const right = str.substring(half)
			if (left === right) result += val

			val++
		}
	})

	return result
}

function part2(inputFile: InputFile) {
	const ranges = getRanges(inputFile)

	let result = 0
	ranges.forEach(range => {
		let val = range.min
		while (val <= range.max) {
			const str = val.toString()
			const len = str.length

			for (let segments = 2; segments <= len; segments++) {
				if (len % segments !== 0) continue
				const segmentLen = len / segments

				let ok = true

				const segment = str.substring(0, segmentLen)
				for (let x = segmentLen; x < len; x += segmentLen) {
					if (str.substring(x, x + segmentLen) !== segment) {
						ok = false
						break
					}
				}

				if (ok) {
					result += val
					break
				}
			}

			val++
		}
	})

	return result
}

function getRanges(inputFile: InputFile): IntRange[] {
	return inputFile
		.string()
		.split(',')
		.map(rangeStr => {
			const nums = rangeStr.split('-')

			const min = parseInt(nums[0])
			if (Number.isNaN(min)) {
				throw new Error(`could not parse int: ${nums[0]}`)
			}

			const max = parseInt(nums[1])
			if (Number.isNaN(max)) {
				throw new Error(`could not parse int: ${nums[1]}`)
			}

			return { min, max }
		})
}
