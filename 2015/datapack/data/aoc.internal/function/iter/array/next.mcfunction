#> aoc.internal:iter/array/next
#
# @internal

data modify storage aoc:state /.iter[-1].element set from storage aoc:state /.iter[-1].data[0]
data remove storage aoc:state /.iter[-1].data[0]
