#> aoc.solve:day3/shared/move

data modify storage aoc:state /.args set value {}
data modify storage aoc:state /.args.data set from storage aoc:state /.iter[-1].element

data modify storage aoc:state /.args.other set value "<"
execute unless function aoc.lib:string/if_not_equal run return run scoreboard players remove #aoc.data.x aoc.state 1

data modify storage aoc:state /.args.other set value ">"
execute unless function aoc.lib:string/if_not_equal run return run scoreboard players add #aoc.data.x aoc.state 1

data modify storage aoc:state /.args.other set value "^"
execute unless function aoc.lib:string/if_not_equal run return run scoreboard players remove #aoc.data.y aoc.state 1

scoreboard players add #aoc.data.y aoc.state 1
