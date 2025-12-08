#> aoc.solve:day3/shared/setup

execute if function aoc.lib:input/if_use_example run function aoc.solve:day3/example
execute unless function aoc.lib:input/if_use_example run function aoc.solve:day3/input

scoreboard players set #aoc.result aoc.state 0

scoreboard players set #aoc.data.x aoc.state 0
scoreboard players set #aoc.data.y aoc.state 0

data modify storage aoc:state /.args set from storage aoc:state /.input
function aoc.lib:string/if_length
scoreboard players operation #aoc.data.size aoc.state = #aoc.return aoc.state

data modify storage aoc:state /.data set value { map: { 0: 1 }, size: 1 }

data modify storage aoc:state /.args set value {}
data modify storage aoc:state /.args.data set from storage aoc:state /.input
