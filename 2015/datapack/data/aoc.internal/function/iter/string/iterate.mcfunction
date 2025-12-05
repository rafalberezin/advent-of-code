#> aoc.internal:iter/string/iterate
#
# @internal

data modify storage aoc:state /.args set from storage aoc:state /.iter[-1].data
execute unless function aoc.lib:string/if_length run return 0

function aoc.internal:iter/string/next
function aoc.lib:function/call_m/direct with storage aoc:state /.iter[-1]
function aoc.internal:iter/string/iterate
