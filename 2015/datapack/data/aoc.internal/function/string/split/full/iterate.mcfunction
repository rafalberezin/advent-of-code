#> aoc.internal:string/split/full/iterate
#
# @internal

execute store result storage aoc:temp /.split.start int 1 run scoreboard players get #aoc.split.start aoc.state
execute store result storage aoc:temp /.split.end int 1 run scoreboard players get #aoc.split.end aoc.state

data modify storage aoc:state /.args set from storage aoc:temp /.split.data
function aoc.lib:string/substring_m/range with storage aoc:temp /.split

function aoc.internal:string/split/full/test_sep

execute if score #aoc.split.end aoc.state >= #aoc.split.len aoc.state \
	run return run data modify storage aoc:temp /.split.result append from storage aoc:temp /.split.data

scoreboard players add #aoc.split.start aoc.state 1
scoreboard players add #aoc.split.end aoc.state 1
function aoc.internal:string/split/full/iterate
