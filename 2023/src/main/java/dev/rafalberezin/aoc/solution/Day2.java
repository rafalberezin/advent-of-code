package dev.rafalberezin.aoc.solution;

import dev.rafalberezin.aoc.Day;
import dev.rafalberezin.aoc.util.Input;
import dev.rafalberezin.aoc.util.Pair;

import java.util.Arrays;
import java.util.Map;

public class Day2 extends Day {

	private static final Map<CubeType, Integer> MAX_CUBE_COUNTS = Map.of(CubeType.RED, 12, CubeType.GREEN, 13, CubeType.BLUE, 14);

	@Override
	public Object part1(Input input) {
		return input.stream()
				.mapToInt(line -> {
					String[] parts = line.split("[;:,]");
					int id = Integer.parseInt(parts[0], 5, parts[0].length(), 10);

					boolean possible = Arrays.stream(parts)
							.skip(1)
							.allMatch(cubeDefinition -> {
								String[] cubeDefinitionParts = cubeDefinition.trim().split(" ");
								return Integer.parseInt(cubeDefinitionParts[0]) <= MAX_CUBE_COUNTS.getOrDefault(CubeType.fromString(cubeDefinitionParts[1]), -1);
							});

					return possible ? id : -1;
				})
				.filter(x -> x != -1)
				.sum();
	}

	@Override
	public Object part2(Input input) {
		return input.stream()
				.mapToInt(line -> Arrays.stream(line.split("[;:,]"))
						.skip(1)
						.map(cubeDefinition -> {
							String[] cubeDefinitionParts = cubeDefinition.trim().split(" ");
							return new Pair<>(Integer.parseInt(cubeDefinitionParts[0]), CubeType.fromString(cubeDefinitionParts[1]));
						})
						.reduce(
								new CubeCount(0, 0, 0),
								(cubeCount, cubeData) -> cubeCount.tryIncrease(cubeData.left(), cubeData.right()),
								CubeCount::max)
						.power()
				).sum();
	}

	private enum CubeType {
		RED,
		GREEN,
		BLUE
		;

		public static CubeType fromString(String str) {
			return CubeType.valueOf(str.toUpperCase());
		}
	}

	private record CubeCount(int red, int green, int blue) {
		public CubeCount tryIncrease(int newCount, CubeType type) {
			return switch (type) {
				case RED -> newCount > red ? new CubeCount(newCount, green, blue) : this;
				case GREEN -> newCount > green ? new CubeCount(red, newCount, blue) : this;
				case BLUE -> newCount > blue ? new CubeCount(red, green, newCount) : this;
			};
		}

		public CubeCount max(CubeCount other) {
			return new CubeCount(
					Math.max(this.red, other.red),
					Math.max(this.green, other.green),
					Math.max(this.blue, other.blue)
			);
		}

		public int power() {
			return red * green * blue;
		}
	}
}
