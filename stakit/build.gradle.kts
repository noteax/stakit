import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = "stakit"
version = "1.0-SNAPSHOT"

buildscript {
    var kotlin_version: String by extra

    val shadowVersion = "2.0.1"
    kotlin_version = "1.2.0"

    repositories {
        mavenCentral()
    }

    dependencies {
        classpath(kotlinModule("gradle-plugin", kotlin_version))
        classpath("com.github.jengelman.gradle.plugins:shadow:$shadowVersion")
    }

}

plugins {
    java
}

apply {
    plugin("kotlin")
    plugin("com.github.johnrengelman.shadow")
}


val kotlin_version: String by extra
val ktor_version = "0.9.1"
val fuel_version = "1.12.0"
val gson_version = "2.8.2"
val junit_version = "4.12"
val logback_version = "1.2.1"

repositories {
    mavenCentral()
    maven("http://dl.bintray.com/kotlin/ktor")
    maven("https://dl.bintray.com/kotlin/kotlinx")
    jcenter()
}

dependencies {
    compile(kotlinModule("stdlib-jdk8", kotlin_version))
    compile("io.ktor:ktor-server-netty:$ktor_version")
    compile("io.ktor:ktor-gson:$ktor_version")
    compile("com.github.kittinunf.fuel:fuel:$fuel_version")
    compile("com.google.code.gson:gson:$gson_version")
    compile("ch.qos.logback:logback-classic:$logback_version")

    testCompile("io.ktor:ktor-server-test-host:$ktor_version")
    testCompile("junit:junit:$junit_version")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

