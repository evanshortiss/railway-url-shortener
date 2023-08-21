FROM registry.access.redhat.com/ubi8/openjdk-17:1.14 as build

WORKDIR /usr/src/app

COPY --chown=jboss:0 ./pom.xml .
COPY --chown=jboss:0 ./src/ ./src/

RUN mvn package --no-transfer-progress

FROM registry.access.redhat.com/ubi8/openjdk-17:1.14

ENV LANGUAGE='en_US:en'

# We make four distinct layers so if there are application changes the library layers can be re-used
COPY --from=build --chown=185 /usr/src/app/target/quarkus-app/lib/ /deployments/lib/
COPY --from=build --chown=185 /usr/src/app/target/quarkus-app/*.jar /deployments/
COPY --from=build --chown=185 /usr/src/app/target/quarkus-app/app/ /deployments/app/
COPY --from=build --chown=185 /usr/src/app/target/quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"
