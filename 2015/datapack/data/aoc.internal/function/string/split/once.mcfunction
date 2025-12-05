#> aoc.internal:string/split/once
#
# @internal

data modify storage aoc:state /.args set value {}
data modify storage aoc:state /.args.data set from storage aoc:temp /.split.data
data modify storage aoc:state /.args.other set from storage aoc:temp /.split.sep

execute if function aoc.lib:string/if_not_equal run return run \
	data modify storage aoc:state /.return append from storage aoc:temp /.split.data

data modify storage aoc:state /.return set value ["", ""]

