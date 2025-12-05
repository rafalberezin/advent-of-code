# Advent of Code 2015

This one's special, as I'm solving it in a heavily restricted environment of Minecraft data packs
(although it's gotten far better since I started in 1.16.4).

Currently this solution data pack runs on `Minecraft 1.21.0 - 1.21.10`,
but that may change in the future.

## How to run

The main logic and inputs are located under the `aoc.solve` namespace,
each day in it's own directory.

(`./datapack/data/aoc.solve/function/day<number>`)

I'll make a better way to run these at some point but for now:

### Inputs

Each day's directory contains 2 files:

- `example.mcfunction` - the example input
- `input.mcfunction` - the real input

These files simply set the input string into data storage.
Replace the present values with your own there.

You can switch between using example and real input by with:

- `/function aoc.lib:input/use_example` - use example input
- `/function aoc.lib:input/use_input` - use real input

### Running solutions

To run the code just call the `main` function inside the day's part directory.

For example run `/function aoc.solve:day1/part1/main` to solve day 1 part 1.
