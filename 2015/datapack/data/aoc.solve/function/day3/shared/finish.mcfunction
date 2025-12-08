#> aoc.solve:day3/shared/finish

data modify storage aoc:state /.args set from storage aoc:state /.data
function aoc.lib:map/if_size
scoreboard players operation #aoc.result aoc.state = #aoc.return aoc.state

scoreboard players reset #aoc.data.x aoc.state
scoreboard players reset #aoc.data.y aoc.state
scoreboard players reset #aoc.data.pos_id aoc.state

data modify storage aoc:state /.data set value {}

function aoc.lib:log/result
