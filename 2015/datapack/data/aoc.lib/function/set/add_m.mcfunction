#> aoc.lib:set/add_m

data remove storage aoc:temp /.any
$execute unless data storage aoc:state /.args.map.$(id) run function aoc.internal:map_and_set/increment_size
$data modify storage aoc:state /.args.map.$(id) set value 0
