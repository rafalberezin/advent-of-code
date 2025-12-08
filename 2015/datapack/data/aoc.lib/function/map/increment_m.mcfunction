#> aoc.lib:map/increment_m

$execute store result score #aoc.temp aoc.state run data get storage aoc:state /.args.map.$(id)
scoreboard players add #aoc.temp aoc.state 1
$execute store result storage aoc:state /.args.map.$(id) int 1 run scoreboard players get #aoc.temp aoc.state

execute if score #aoc.temp aoc.state matches 1 run function aoc.internal:map_and_set/increment_size
