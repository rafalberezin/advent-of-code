import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

export default {
	part1,
	part2,
} satisfies Day

const FROM_1 = 'you'
const FROM_2 = 'svr'
const TO = 'out'

const HIT_1 = 'dac'
const HIT_2 = 'fft'

function part1(inputFile: InputFile) {
	const lines = inputFile.lines()

	const edges = new Map<string, string[]>()

	for (const line of lines) {
		const [from, ...tos] = line.split(' ')
		edges.set(from.substring(0, from.length - 1), tos)
	}

	const cache = new Map<string, number>()
	function dfs(node: string): number {
		if (node === TO) return 1

		const cached = cache.get(node)
		if (cached !== undefined) return cached

		const moves = edges.get(node)
		if (moves === undefined) return 0

		let count = moves.map(move => dfs(move)).reduce((sum, val) => sum + val, 0)
		cache.set(node, count)
		return count
	}

	return dfs(FROM_1)
}

function part2(inputFile: InputFile) {
	const lines = inputFile.lines()

	const edges = new Map<string, string[]>()

	for (const line of lines) {
		const [from, ...tos] = line.split(' ')
		edges.set(from.substring(0, from.length - 1), tos)
	}

	const cache = new Map<string, number>()
	function dfs(node: string, hit1: boolean, hit2: boolean): number {
		switch (node) {
			case TO:
				return hit1 && hit2 ? 1 : 0
			case HIT_1:
				hit1 = true
				break
			case HIT_2:
				hit2 = true
				break
		}

		const key = `${node}${(hit1 ? '1' : '') + (hit2 ? '2' : '')}`
		const cached = cache.get(key)
		if (cached !== undefined) return cached

		const moves = edges.get(node)
		if (moves === undefined) return 0

		let count = moves
			.map(move => dfs(move, hit1, hit2))
			.reduce((sum, val) => sum + val, 0)
		cache.set(key, count)
		return count
	}

	return dfs(FROM_2, false, false)
}
