#> aoc.solve:day2/part2/line

function aoc.solve:day2/shared/parse_and_order_line

scoreboard players operation #aoc.data.sum aoc.state = #aoc.data.min aoc.state
scoreboard players operation #aoc.data.sum aoc.state += #aoc.data.mid aoc.state
scoreboard players operation #aoc.data.sum aoc.state *= #aoc.const.2 aoc.state

scoreboard players operation #aoc.data.volume aoc.state = #aoc.data.min aoc.state
scoreboard players operation #aoc.data.volume aoc.state *= #aoc.data.mid aoc.state
scoreboard players operation #aoc.data.volume aoc.state *= #aoc.data.max aoc.state

scoreboard players operation #aoc.data.sum aoc.state += #aoc.data.volume aoc.state

scoreboard players operation #aoc.result aoc.state += #aoc.data.sum aoc.state
