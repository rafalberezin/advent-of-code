#> aoc.solve:day2/shared/parse_and_order_line

data modify storage aoc:state /.args set value {sep: "x"}
data modify storage aoc:state /.args.data set from storage aoc:state /.iter[-1].element
function aoc.lib:string/split

data modify storage aoc:temp /.any set value {}

data modify storage aoc:temp /.any.data set from storage aoc:state /.return[0]
function aoc.lib:string/parse_int_m with storage aoc:temp /.any
scoreboard players operation #aoc.data.min aoc.state = #aoc.return aoc.state

data modify storage aoc:temp /.any.data set from storage aoc:state /.return[1]
function aoc.lib:string/parse_int_m with storage aoc:temp /.any
scoreboard players operation #aoc.data.mid aoc.state = #aoc.return aoc.state

data modify storage aoc:temp /.any.data set from storage aoc:state /.return[2]
function aoc.lib:string/parse_int_m with storage aoc:temp /.any
scoreboard players operation #aoc.data.max aoc.state = #aoc.return aoc.state

execute if score #aoc.data.min aoc.state > #aoc.data.mid aoc.state run scoreboard players operation #aoc.data.min aoc.state >< #aoc.data.mid aoc.state
execute if score #aoc.data.min aoc.state > #aoc.data.max aoc.state run scoreboard players operation #aoc.data.min aoc.state >< #aoc.data.max aoc.state
execute if score #aoc.data.mid aoc.state > #aoc.data.max aoc.state run scoreboard players operation #aoc.data.mid aoc.state >< #aoc.data.max aoc.state
