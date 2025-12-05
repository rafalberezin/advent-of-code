#> aoc.lib:log/result

data modify storage aoc:temp /.any set value {click_event: {action: "copy_to_clipboard"}}
execute store result storage aoc:temp /.any.text int 1 run scoreboard players get #aoc.result aoc.state
data modify storage aoc:temp /.any.text set string storage aoc:temp /.any.text
data modify storage aoc:temp /.any.click_event.value set from storage aoc:temp /.any.text

tellraw @s ["[ " \
	,{text: "RESULT", color: "#69ca73"} \
	," ]: " \
	,{ \
		storage: "aoc:temp", nbt: "/.any", color: "#5991ec", interpret: true, hover_event: { \
			 action: "show_text" \
			,value: [ \
				{text: "Click to copy", color: "#edb97e"} \
			] \
		} \
	} \
]
