#> aoc.lib:iter/string

data modify storage aoc:state /.iter append from storage aoc:state /.args
function aoc.internal:iter/string/iterate
data remove storage aoc:state /.iter[-1]
