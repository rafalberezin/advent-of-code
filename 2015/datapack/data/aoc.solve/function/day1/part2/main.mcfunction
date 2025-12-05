#> aoc.solve:day1/part2/main

execute if function aoc.lib:input/if_use_example run function aoc.solve:day1/example
execute unless function aoc.lib:input/if_use_example run function aoc.solve:day1/input

scoreboard players set #aoc.result aoc.state 0
scoreboard players set #aoc.data.1 aoc.state 0

data modify storage aoc:state /.args set value { fn: "aoc.solve:day1/part2/count" }
data modify storage aoc:state /.args.data set from storage aoc:state /.input
function aoc.lib:iter/string

scoreboard players reset #aoc.data.1 aoc.state

function aoc.lib:log/result
