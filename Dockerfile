FROM openjdk

ADD stakit/build/libs/stakit-1.0-SNAPSHOT-all.jar /stakit.jar
ADD stakit-ui/dist /dist

CMD java -cp stakit.jar StakitKt /dist