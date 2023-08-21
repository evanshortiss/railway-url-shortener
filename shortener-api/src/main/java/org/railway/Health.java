package org.railway;

import java.lang.management.ManagementFactory;
import java.time.Instant;

public class Health {
  public String uptime;
  public Instant serverTime;

  public Health () {
    uptime = (ManagementFactory.getRuntimeMXBean().getUptime() / 1000) + " seconds";
    serverTime = Instant.now();
  }
}
