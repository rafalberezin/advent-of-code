#> aoc.solve:day3/shared/iter

function aoc.solve:day3/shared/move

scoreboard players operation #aoc.data.pos_id aoc.state = #aoc.data.x aoc.state
scoreboard players operation #aoc.data.pos_id aoc.state *= #aoc.data.size aoc.state
scoreboard players operation #aoc.data.pos_id aoc.state += #aoc.data.y aoc.state

data modify storage aoc:temp /.any set value {}
execute store result storage aoc:temp /.any.id int 1 run scoreboard players get #aoc.data.pos_id aoc.state

data modify storage aoc:state /.args set from storage aoc:state /.data
function aoc.lib:set/add_m with storage aoc:temp /.any
data modify storage aoc:state /.data set from storage aoc:state /.args
