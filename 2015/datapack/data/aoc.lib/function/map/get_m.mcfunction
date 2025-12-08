#> aoc.lib:map/get_m

data remove storage aoc:state /.return
$data modify storage aoc:state /.return set from storage aoc:state /.args.map.$(id)
