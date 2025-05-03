plugins {
    java
}

group = "dev.rafalberezin.aoc"
version = "1.0.0"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(24))
    }
}

tasks.register<JavaExec>("run") {
    group = "application"
    description = "Run Advent of Code 2023 solution for a specific day and part"

    classpath = sourceSets["main"].runtimeClasspath
    mainClass.set("dev.rafalberezin.aoc.Main")

    val day = project.findProperty("day") as String? ?: "1"
    val part = project.findProperty("part") as String? ?: ""
    val example =  project.hasProperty("example").toString()

    args = listOf(day, part, example)
}
