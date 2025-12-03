import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

const BATTERY_SIZE_PART1 = 2
const BATTERY_SIZE_PART2 = 12

export default {
	part1: input => solve(input, BATTERY_SIZE_PART1),
	part2: input => solve(input, BATTERY_SIZE_PART2),
} satisfies Day

function solve(inputFile: InputFile, size: number): number {
	return inputFile
		.digitGrid()
		.map(digits => findMaxBattery(size, digits))
		.reduce((sum, val) => sum + val, 0)
}

function findMaxBattery(size: number, digits: number[]): number {
	const battery = new Array(size).fill(0)

	for (let i = 0; i < digits.length; i++) {
		const digit = digits[i]
		const digitsLeft = digits.length - i
		const batteryStart = Math.max(0, size - digitsLeft)

		for (let j = batteryStart; j < size; j++) {
			if (digit <= battery[j]) continue

			battery[j] = digit
			while (++j < size) battery[j] = 0
			break
		}
	}

	return battery.reduce((acc, digit) => acc * 10 + digit, 0)
}
