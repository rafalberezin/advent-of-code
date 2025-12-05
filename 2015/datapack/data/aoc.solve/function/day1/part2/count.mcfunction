#> aoc.solve:day1/part2/count

scoreboard players add #aoc.result aoc.state 1
scoreboard players add #aoc.data.1 aoc.state 1

execute store success score #aoc.temp aoc.state \
	run data modify storage aoc:state /.iter[-1].element set value ")"

execute if score #aoc.temp aoc.state matches 0 \
	run scoreboard players remove #aoc.data.1 aoc.state 2

execute if score #aoc.data.1 aoc.state matches ..-1 run function aoc.lib:iter/stop

