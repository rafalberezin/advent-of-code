#> aoc.internal:string/split/chars
#
# @internal

scoreboard players add #aoc.split.start aoc.state 1

data modify storage aoc:state /.return append string storage aoc:temp /.split.data 0 1
data modify storage aoc:temp /.split.data set string storage aoc:temp /.split.data 1

execute if score #aoc.split.start aoc.state < #aoc.split.len aoc.state run function aoc.internal:string/split/chars
