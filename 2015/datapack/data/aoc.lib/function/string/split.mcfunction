#> aoc.lib:string/split

data modify storage aoc:temp /.split set from storage aoc:state /.args

data modify storage aoc:state /.return set value []

data modify storage aoc:state /.args set from storage aoc:temp /.split.data
execute unless function aoc.lib:string/if_length run return 0
scoreboard players operation #aoc.split.len aoc.state = #aoc.return aoc.state

scoreboard players set #aoc.split.start aoc.state 0

data modify storage aoc:state /.args set from storage aoc:temp /.split.sep
execute unless function aoc.lib:string/if_length run return run function aoc.internal:string/split/chars
scoreboard players operation #aoc.split.end aoc.state = #aoc.return aoc.state

execute if score #aoc.split.len aoc.state < #aoc.split.end aoc.state \
	run return run data modify storage aoc:state /.return append from storage aoc:temp /.split.data

execute if score #aoc.split.len aoc.state = #aoc.split.end aoc.state \
	run return run function aoc.internal:string/split/once

return run function aoc.internal:string/split/full/main

