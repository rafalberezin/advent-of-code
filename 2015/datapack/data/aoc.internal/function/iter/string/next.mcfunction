#> aoc.internal:iter/string/next
#
# @internal

data modify storage aoc:state /.iter[-1].element set string storage aoc:state /.iter[-1].data 0 1
data modify storage aoc:state /.iter[-1].data set string storage aoc:state /.iter[-1].data 1
