#> aoc.solve:day1/part1/count

execute store success score #aoc.temp aoc.state \
	run data modify storage aoc:state /.iter[-1].element set value ")"

execute if score #aoc.temp aoc.state matches 1 \
	run return run scoreboard players add #aoc.result aoc.state 1

scoreboard players remove #aoc.result aoc.state 1
