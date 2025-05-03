package dev.rafalberezin.aoc.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public class Input {
	private static final String BASE_PATH = "src/main/resources/inputs/day";

	private final byte day;
	private final boolean example;
	private final Path path;

	public Input(byte day, boolean example) {
		this(day, example, Part.Single);
	}

	private Input(byte day, boolean example, Part part) {
		this.day = day;
		this.example = example;
		this.path = Path.of(BASE_PATH + day, (example ? "example" + part.toString() : "main") + ".txt");
	}

	public Input forPart(Part part) {
		// Real input is the same for both parts, while example might be different
		if (!example) return this;

		return new Input(day, true, part);
	}

	public String string() {
		try {
			return Files.readString(path);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public List<String> list() {
		try (Stream<String> lines = Files.lines(path)) {
			return lines.toList();
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public Stream<String> stream() {
		return string().lines();
	}

	public boolean isExample() {
		return example;
	}

	public enum Part {
		Single(""),
		Part1(".part1"),
		Part2(".part2"),
		;

		private final String part;

		Part(String part) {
			this.part = part;
		}

		public String toString() {
			return part;
		}
	}
}
