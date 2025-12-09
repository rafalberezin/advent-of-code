interface Points {
	2: Point2D
	3: Point3D
}

export type Point2D = [number, number]
export type Point3D = [number, number, number]

export function parsePoints<T extends keyof Points>(
	lines: string[],
	size: T,
	sep: string | RegExp = ',',
): Points[T][] {
	return lines.map(line => {
		const nums = line.split(sep)

		if (nums.length !== size) {
			throw new Error(
				`expected ${size} numbers in a line, got ${nums.length}: ${line}`,
			)
		}

		return nums.map(str => {
			const num = parseInt(str)
			if (Number.isNaN(num)) throw new Error(`could not parse int: ${str}`)
			return num
		}) as Points[T]
	})
}
