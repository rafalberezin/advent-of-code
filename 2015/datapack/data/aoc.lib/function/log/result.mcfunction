#> aoc.lib:log/result

tellraw @s ["[ " \
	,{text: "RESULT", color: "#69ca73"} \
	," ]: " \
	,{score: {name: "#aoc.result", objective: "aoc.state"}, color: "#5991ec"} \
]
