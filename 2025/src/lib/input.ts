import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const REL = path.join(ROOT, '..', 'solutions')

export interface InputFile {
	lines(): string[]
	string(): string
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

	return {
		lines: () => lines(file),
		string: () => string(file),
	}
}

function lines(file: string): string[] {
	return string(file).split('\n')
}

function string(file: string): string {
	return fs.readFileSync(file).toString().trimEnd()
}
