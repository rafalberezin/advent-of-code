#> aoc.lib:iter/array

data modify storage aoc:state /.iter append from storage aoc:state /.args
function aoc.internal:iter/array/iterate
data remove storage aoc:state /.iter[-1]
