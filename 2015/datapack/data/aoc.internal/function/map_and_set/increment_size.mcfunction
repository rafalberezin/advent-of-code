#> aoc.internal:map_and_set/increment_size
#
# @internal

execute store result score #aoc.temp aoc.state run data get storage aoc:state /.args.size
scoreboard players add #aoc.temp aoc.state 1
execute store result storage aoc:state /.args.size int 1 run scoreboard players get #aoc.temp aoc.state
