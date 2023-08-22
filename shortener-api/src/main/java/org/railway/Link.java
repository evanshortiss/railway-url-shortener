package org.railway;

import java.time.Instant;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Link extends PanacheEntity {
    @Column(nullable = false, columnDefinition = "TEXT")
    public String url;
    
    @Column(nullable = false)
    public Instant create_ts;

    @Column(nullable = false)
    public Boolean active;
    
    @Column(nullable = false, unique = true)
    public String shortId;

    public Link () {}

    public Link (String url) {
        this.url = url;
        this.create_ts = Instant.now();
        this.active = true;
        this.shortId = CrappyUUID.generate();        
    }
}