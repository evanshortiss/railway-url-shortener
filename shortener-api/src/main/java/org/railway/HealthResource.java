package org.railway;

import org.hibernate.reactive.mutiny.Mutiny;
import org.jboss.logging.Logger;

import io.quarkus.scheduler.Scheduled;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/health")
public class HealthResource {
    @Inject
    Mutiny.SessionFactory sessionFactory;

    private static final Logger Log = Logger.getLogger(HealthResource.class);
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> getHealth() {
        Log.debug("Running health check due to HTTP request");
        
        return hasDatabaseConnectivity().map((connected) -> {
            if (connected == true) {
                Log.debug("Health check passed. Returning HTTP 200.");
                return Response.ok(new Health()).build();
            } else {
                Log.error("Health check failed: DB unavailable. Returning HTTP 500.");
                return Response.serverError().build();
            }
        });
    }
    
    @Scheduled(every = "60s", delayed = "5s")
    Uni<Void> checkDatabaseConnectivity () {
        Log.debug("Running health check due to schedule.");
        return hasDatabaseConnectivity().map((connected) -> {
            if (connected == true) {
                Log.debug("Health check passed.");
                return null;
            } else {
                Log.error("Health check failed: DB unavailable.");
                return null;
            }
        });
    }

    Uni<Boolean> hasDatabaseConnectivity () {
        return sessionFactory.withTransaction((session, transaction) -> {
            return session.createNativeQuery("SELECT 1")
                .getSingleResult()
                .map((result) -> {
                    Log.debug("Health check database query complete.");
                    return true;
                })
                .onFailure().recoverWithUni(() -> {
                    Log.error("Health check failed on Postgres query.");
                    return Uni.createFrom().item(false);
                });
            })
            .onFailure().recoverWithUni(() -> {
                Log.error("Health check failed before executing Postgres query.");
                return Uni.createFrom().item(false);
            });
    }
}