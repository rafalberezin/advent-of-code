interface Points {
	2: Point2D
	3: Point3D
}

export type Point2D = [number, number]
export type Point3D = [number, number, number]
export type Polygon = Point2D[]

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

export function pointInPolygon(point: Point2D, polygon: Polygon): boolean {
	const [x, y] = point

	let inside = false
	for (let f = 0, t = polygon.length - 1; f < polygon.length; t = f++) {
		const fromX = polygon[f][0]
		const fromY = polygon[f][1]
		const toX = polygon[t][0]
		const toY = polygon[t][1]

		if (fromY > y === toY > y) continue

		const slope = (toX - fromX) / (toY - fromY)
		const crossingX = (y - fromY) * slope + fromX

		if (crossingX >= x) inside = !inside
	}

	return inside
}
