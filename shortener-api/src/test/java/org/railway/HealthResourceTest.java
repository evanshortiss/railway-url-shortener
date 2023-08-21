package org.railway;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class HealthResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/health")
          .then()
             .statusCode(200);
    }

}