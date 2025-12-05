#> aoc.solve:day2/part2/main

execute if function aoc.lib:input/if_use_example run function aoc.solve:day2/example
execute unless function aoc.lib:input/if_use_example run function aoc.solve:day2/input

scoreboard players set #aoc.result aoc.state 0

data modify storage aoc:state /.args set value {sep: "\n"}
data modify storage aoc:state /.args.data set from storage aoc:state /.input
function aoc.lib:string/split

data modify storage aoc:state /.args set value {fn: "aoc.solve:day2/part2/line"}
data modify storage aoc:state /.args.data set from storage aoc:state /.return
function aoc.lib:iter/array

function aoc.solve:day2/shared/cleanup
function aoc.lib:log/result
