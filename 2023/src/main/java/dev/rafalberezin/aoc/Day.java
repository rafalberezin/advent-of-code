package dev.rafalberezin.aoc;

import java.time.Duration;
import java.time.Instant;
import java.util.function.Function;

import dev.rafalberezin.aoc.util.Input;

public abstract class Day {
	public abstract Object part1(Input input);
	public abstract Object part2(Input input);

	protected void runPart(String part, Input input) {
		System.out.println("Running part " + part);

		Function<Input, Object> partFunction = part.equals("1") ? this::part1 : this::part2;

		Instant startTime = Instant.now();

		Object solution = partFunction.apply(input);

		Instant endTime = Instant.now();
		Duration elapsed = Duration.between(startTime, endTime);

		System.out.println("Solution: " + solution);
		System.out.println("Time: " + elapsed);
	}
}
