import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const REL = path.join(ROOT, '..', 'solutions')

export interface InputFile {
	lines(): string[]
	string(): string
	grid(): string[][]
	digitGrid(): number[][]
	isExample(): boolean
}

export function loadInput(day: number): InputFile {
	return inputFile(path.join(REL, `day${day}`, 'input.txt'))
}

export function loadExample(day: number): InputFile {
	return inputFile(path.join(REL, `day${day}`, 'example.txt'))
}

function inputFile(file: string): InputFile {
	if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
		throw new Error(`file '${file}' doesn't exist`)
	}

	const example = file.endsWith('example.txt')

	return {
		lines: () => lines(file),
		string: () => string(file),
		grid: () => grid(file),
		digitGrid: () => digitGrid(file),
		isExample: () => example,
	}
}

function lines(file: string): string[] {
	return string(file).split('\n')
}

function string(file: string): string {
	return fs.readFileSync(file).toString().trimEnd()
}

function grid(file: string): string[][] {
	return lines(file).map(row => row.split(''))
}

function digitGrid(file: string): number[][] {
	return lines(file).map(row => row.split('').map(charToDigit))
}

const CHAR_CODE_0 = '0'.charCodeAt(0)
function charToDigit(char: string): number {
	return char.charCodeAt(0) - CHAR_CODE_0
}
