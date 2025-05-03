package dev.rafalberezin.aoc.solution;

import dev.rafalberezin.aoc.Day;
import dev.rafalberezin.aoc.util.Input;
import dev.rafalberezin.aoc.util.Pair;

import java.util.Comparator;
import java.util.Map;

public class Day1 extends Day {

	@Override
	public Object part1(Input input) {
		return input.forPart(Input.Part.PART_1).stream()
				.mapToInt(line ->
						10 * (line.chars().filter(Character::isDigit).findFirst().orElse('0') - '0')
								+ line.chars().filter(Character::isDigit).reduce((a, b) -> b).orElse('0') - '0'
				)
				.sum();
	}

	private static final Map<String, Integer> TEXT_DIGITS_MAP = Map.ofEntries(
			Map.entry("1", 1), Map.entry("one", 1),
			Map.entry("2", 2), Map.entry("two", 2),
			Map.entry("3", 3), Map.entry("three", 3),
			Map.entry("4", 4), Map.entry("four", 4),
			Map.entry("5", 5), Map.entry("five", 5),
			Map.entry("6", 6), Map.entry("six", 6),
			Map.entry("7", 7), Map.entry("seven", 7),
			Map.entry("8", 8), Map.entry("eight", 8),
			Map.entry("9", 9), Map.entry("nine", 9)
	);

	@Override
	public Object part2(Input input) {
		return input.forPart(Input.Part.PART_2).stream()
				.mapToInt(line ->
						10 * TEXT_DIGITS_MAP.entrySet().stream()
								.map(textDigit -> new Pair<>(
										textDigit.getValue(),
										line.indexOf(textDigit.getKey())
								))
								.filter(pair -> pair.right() != -1)
								.min(Comparator.comparingInt(Pair::right))
								.orElseGet(() -> new Pair<>(0, 0)).left()
								+ TEXT_DIGITS_MAP.entrySet().stream()
								.map(textDigit -> new Pair<>(
										textDigit.getValue(),
										line.lastIndexOf(textDigit.getKey())
								))
								.filter(pair -> pair.right() != -1)
								.max(Comparator.comparingInt(Pair::right))
								.orElseGet(() -> new Pair<>(0, 0)).left()
				)
				.sum();
	}

/*
	This is a bit faster
	private static final String[] TEXT_DIGITS = new String[]{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

	@Override
	public Object part1(Input input) {
		return input.forPart(Input.Part.Part1).stream().mapToInt(line -> {
			char[] chars = line.toCharArray();

			int lineResult = 0;

			for (int i = 0; i < chars.length; i++) {
				int ch = chars[i] - '0';
				if (ch > 0 && ch <= 9 ) {
					lineResult = 10 * ch;
					break;
				}
			}

			for (int i = chars.length - 1; i >= 0; i--) {
				int ch = chars[i] - '0';
				if (ch > 0 && ch <= 9 ) {
					lineResult += ch;
					break;
				}
			}

			return lineResult;
		}).sum();
	}

	@Override
	public Object part2(Input input) {
			return input.forPart(Input.Part.Part2).stream().mapToInt(line -> {
			char[] chars = line.toCharArray();
			int first = 0;
			int last = 0;

			for (int i = 0; i < chars.length; i++) {
				int ch = chars[i] - '0';
				int digit = 0;

				if (ch > 0 && ch <= 9) {
					digit = ch;
				} else {
					for (int j = 0; j < TEXT_DIGITS.length; j++) {
						String textDigit = TEXT_DIGITS[j];
						if (line.regionMatches(i, textDigit, 0, textDigit.length())) {
							digit = j + 1;
							break;
						}
					}
				}

				if (digit == 0) continue;

				last = digit;
				if (first == 0) {
					first = digit * 10;
				}
			}

			return first + last;
		}).sum();
	}
*/
}
