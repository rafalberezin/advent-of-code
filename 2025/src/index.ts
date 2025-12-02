import { loadExample, loadInput } from '$lib/input'
import solutions from './solutions'

import type { InputFile } from '$lib/input'
import type { Day } from '$types/day'

function main() {
	const args = process.argv.slice(2)
	let argsCount = args.length

	if (argsCount === 0) {
		printUsage()
		return
	}

	const dayNum = parseInt(args[0])
	if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > 12) {
		printWithBorder('Day must be a number between 1 and 12')
		return
	}

	const day = solutions[`day${dayNum}`]
	if (day === undefined) {
		printWithBorder(`No solution for day ${dayNum}`)
		return
	}

	printWithBorder(`Running ❄︎ Advent of Code ❄︎ 2025 day ${dayNum}`)

	let input
	if (argsCount > 1 && args[args.length - 1] === '-e') {
		console.log('  Using example input')
		input = loadExample(dayNum)
		argsCount--
	} else {
		input = loadInput(dayNum)
	}

	if (argsCount < 2) {
		runPart(day, '1', input)
		runPart(day, '2', input)
		return
	}

	const part = args[1]
	if (part === '1' || part === '2') {
		runPart(day, part, input)
		return
	}

	printWithBorder(
		"Part should be either '1' or '2' (or don't specify to run both)",
	)
	printUsage()
}

function runPart(day: Day, part: '1' | '2', input: InputFile) {
	console.log(`┌ Running part ${part}`)

	try {
		const startTime = performance.now()
		const solution = day[`part${part}`](input)
		const elapsed = performance.now() - startTime

		console.log(`├ ✔ Solution: ${solution}`)
		console.log(`└ ~ Time: ${elapsed.toFixed(3)}ms`)
	} catch (e) {
		console.log(`└ ❌ An error occured: ${e instanceof Error ? e.message : e}`)
	}
}

function printWithBorder(message: string, padding = 3) {
	const border = '─'.repeat(message.length + padding * 2)
	console.log(`${border}\n${' '.repeat(padding)}${message}\n${border}`)
}

const USAGE = `
Usage: pnpm solve <day> [<part>] [-e]
Use '-e' flag to use the example input

Example: pnpm solve 3 2 -e
 - runs day 3 part 2 with example input
`.trim()

function printUsage() {
	console.log(USAGE)
}

main()
