#> aoc.internal:load
#
# @internal

gamerule maxCommandChainLength 2147483647

scoreboard objectives add aoc.state dummy

data modify storage aoc:temp / set value {}
data modify storage aoc:state / set value { \
	input: "", \
	iter: [], \
}

