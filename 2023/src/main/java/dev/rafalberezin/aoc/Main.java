package dev.rafalberezin.aoc;

import dev.rafalberezin.aoc.solution.*;
import dev.rafalberezin.aoc.util.Input;

public class Main {
	private static final Day[] DAYS = {
		new Day1(),
		new Day2(),
	};

	private static final String USAGE_INFO = """
					Usage: "./gradlew run [--day=<DAY>] [--part=<PART>] [--example]"
					Use "--example" flag to use the example input

					Example: "./gradlew run --day=3 --part=2 --example" - runs day 3 part 2 with example input""";

	public static void main(String[] args) {
		if (args.length < 3) {
			System.err.println("Please use gradle to run the solutions, or provide the arguments in order:" +
					"\nday (int 1-25), part (1/2), example (true/false)\n\n" + USAGE_INFO);
			return;
		}

		byte dayNumber;
		try {
			dayNumber = Byte.parseByte(args[0]);
		} catch (NumberFormatException e) {
			dayNumber = 0;
		}

		if (dayNumber < 1 || dayNumber > 25) {
			System.err.println("Day must be a number between 1 and 25");
			return;
		}

		if (dayNumber > DAYS.length) {
			System.err.println("No solution for day: " + dayNumber);
			return;
		}

		Day day = DAYS[dayNumber - 1];
		Input input = new Input(dayNumber, args[2].equals("true"));

		String part = args[1];
		if (!part.equals("1") && !part.equals("2") && part.length() > 0) {
			System.err.println("Part must be either \"1\" or \"2\" (or don't specify to run both)");
			System.out.println(USAGE_INFO);
			return;
		}

		if (!part.equals("2")) {
			day.runPart("1", input);
		}
		if (!part.equals("1")) {
			day.runPart("2", input);
		}
	}
}
