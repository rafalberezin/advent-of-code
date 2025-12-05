#> aoc.lib:log/iter

tellraw @s ["[ " \
	,{text: "RETURN", color: "#edb97e"} \
	," ]: " \
	,{storage: "aoc:state", nbt: "/.return"} \
]
