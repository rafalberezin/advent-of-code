#> aoc.lib:log/input

tellraw @s ["[ " \
	,{text: "INPUT", color: "#edb97e"} \
	," ]:\n" \
	,{storage: "aoc:state", nbt: "/.input", color: "#5991ec"} \
]
