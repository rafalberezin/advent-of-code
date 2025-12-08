export interface DSU {
	find(x: number): number
	union(x: number, y: number): void
	size(x: number): number
	roots(): number[]
}

export function newDSU(size: number): DSU {
	if (size <= 0) throw new Error('DSU size cannot be less than 1')

	const parent = Array.from({ length: size }, (_, i) => i)
	const sizes = new Array<number>(size).fill(1)

	return {
		find: x => find(parent, x),
		union: (x, y) => union(parent, sizes, x, y),
		size: x => sizes[find(parent, x)],
		roots: () => parent.filter((x, i) => x === i),
	}
}

function find(parent: number[], x: number): number {
	if (parent[x] !== x) parent[x] = find(parent, parent[x])
	return parent[x]
}

function union(parent: number[], sizes: number[], x: number, y: number) {
	const xRoot = find(parent, x)
	const yRoot = find(parent, y)

	if (xRoot === yRoot) return

	const xSize = sizes[xRoot]
	const ySize = sizes[yRoot]

	if (ySize > xSize) {
		parent[xRoot] = yRoot
		sizes[yRoot] += xSize
	} else {
		parent[yRoot] = xRoot
		sizes[xRoot] += ySize
	}
}
