package org.railway;

import org.hibernate.reactive.mutiny.Mutiny;
import org.jboss.logging.Logger;

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
        Log.debug("Running health check");
        return sessionFactory.withTransaction((session, transaction) -> {
            return session.createNativeQuery("SELECT 1")
                .getSingleResult()
                .map((result) -> {
                    if (result.equals(1)) {
                        Log.debug("Health check passed. Returning HTTP 200");
                        return Response.ok(new Health()).build();
                    } else {
                        Log.warn("Health check failed due to broken database connectivity. Returning HTTP 500.");
                        return Response.serverError().build();
                    }
                })
                .onFailure().recoverWithItem(Response.serverError().build());
        });
    }
}
