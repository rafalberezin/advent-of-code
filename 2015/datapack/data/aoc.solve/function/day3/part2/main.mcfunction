#> aoc.solve:day3/part2/main

function aoc.solve:day3/shared/setup

scoreboard players set #aoc.data.x2 aoc.state 0
scoreboard players set #aoc.data.y2 aoc.state 0

data modify storage aoc:state /.args.fn set value "aoc.solve:day3/part2/iter"
function aoc.lib:iter/string

scoreboard players reset #aoc.data.x2 aoc.state
scoreboard players reset #aoc.data.y2 aoc.state

function aoc.solve:day3/shared/finish

