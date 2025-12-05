#> aoc.internal:string/split/full/test_sep
#
# @internal

data modify storage aoc:state /.args set value {}
data modify storage aoc:state /.args.data set from storage aoc:state /.return
data modify storage aoc:state /.args.other set from storage aoc:temp /.split.sep

execute if function aoc.lib:string/if_not_equal run return 0

data modify storage aoc:state /.args set from storage aoc:temp /.split.data

execute store result storage aoc:temp /.split.end int 1 run scoreboard players get #aoc.split.start aoc.state
function aoc.lib:string/substring_m/start with storage aoc:temp /.split
data modify storage aoc:temp /.split.result append from storage aoc:state /.return

execute store result storage aoc:temp /.split.start int 1 run scoreboard players get #aoc.split.end aoc.state
function aoc.lib:string/substring_m/end with storage aoc:temp /.split
data modify storage aoc:temp /.split.data set from storage aoc:state /.return

scoreboard players operation #aoc.split.len aoc.state -= #aoc.split.end aoc.state
execute if score #aoc.split.len aoc.state matches ..0 run return 0
scoreboard players operation #aoc.split.end aoc.state -= #aoc.split.start aoc.state
scoreboard players remove #aoc.split.end aoc.state 1
scoreboard players set #aoc.split.start aoc.state -1
