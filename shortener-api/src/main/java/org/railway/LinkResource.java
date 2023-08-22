package org.railway;

import java.net.MalformedURLException;
import java.net.URL;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.panache.PanacheQuery;
import io.quarkus.panache.common.Parameters;

import org.jboss.logging.Logger;

import io.smallrye.mutiny.Uni;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/links")
public class LinkResource {
    private static final Logger Log = Logger.getLogger(LinkResource.class);

    public static boolean isValidURL(String url) {
        try {
            new URL(url);
            return true;
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @GET
    // @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Uni<Response> getLink(@PathParam("id") String id) {      
        Log.debugf("checking for existing link with id %s", id);
        
        PanacheQuery<Link> links = Link.find(
            "shortId = :shortId and active = :active",
            Parameters.with("shortId", id).and("active", true)
        );

        return links.firstResult().map(l -> {
            if (l == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            } else {
                return Response.ok(l).build();
            }
        });
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> createLink(String url) {
        if (isValidURL(url) == false) {
            Log.warnf("received invalid URL: %s", url);
            return Uni.createFrom().item(
                Response.status(Response.Status.BAD_REQUEST).build()
            );
        }

        Log.infof("creating shortlink for %s", url);

        Link link = new Link(url);

        return Panache
            .withTransaction(link::persist)
            .replaceWith(
                Response.ok(link).status(Response.Status.CREATED)::build
            );
    }
}
