#> aoc.lib:log/iter

tellraw @s ["[ " \
	,{text: "ITER", color: "#edb97e"} \
	," ]: " \
	,{storage: "aoc:state", nbt: "/.iter[-1].element"} \
]
