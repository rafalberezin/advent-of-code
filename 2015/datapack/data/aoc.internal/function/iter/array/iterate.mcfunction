#> aoc.internal:iter/array/iterate
#
# @internal

execute unless data storage aoc:state /.iter[-1].data[0] run return 0

function aoc.internal:iter/array/next
function aoc.lib:function/call_m/direct with storage aoc:state /.iter[-1]
function aoc.internal:iter/array/iterate
