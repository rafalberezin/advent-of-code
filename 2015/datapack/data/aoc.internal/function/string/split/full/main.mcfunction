#> aoc.internal:string/split/full/main
#
# @internal

data modify storage aoc:temp /.split.result set value []

function aoc.internal:string/split/full/iterate

data modify storage aoc:state /.return set from storage aoc:temp /.split.result
return run data get storage aoc:state /.return
