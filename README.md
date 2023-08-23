# Quarkus, NGINX, and React on Railway

This is a sample application that demonstrates various features of the
[railway.app](https://railway.app) platform.

By deploying and using it you'll learn how to:

* Use the [`railway` CLI](https://docs.railway.app/develop/cli) for local development.
* Leverage [Monorepo Support](https://docs.railway.app/deploy/monorepo) and configure [Watch Paths](https://docs.railway.app/deploy/builds#watch-paths) to:
  * Build and deploy (using Nixpacks) a Node.js application that uses [Express framework](https://expressjs.com/). 
  * Build and deploy (using Nixpacks) a modern Java application that uses the [Quarkus framework](https://quarkus.io/). 
  * Build and deploy (using Dockerfile) a React application that's served by NGINX.
  * Build and deploy (using Dockerfile) a Postgres clean up job.
* Use [Private Networking](https://docs.railway.app/reference/private-networking) to proxy API requests from the NGINX service to the Java application.
* Deploy and connect to a [Postgres Database](https://docs.railway.app/databases/postgresql) provided by Railway.
* Use [Cron Jobs](https://docs.railway.app/reference/cron-jobs) to update database records on a fixed interval.
* Configure and use [Variables](https://docs.railway.app/develop/variables) in builds and deployments.
* Override the `PORT` variable (see [Exposing your App](https://docs.railway.app/deploy/exposing-your-app)) to define a known port, while using Private Networking.
* Configure [Healthchecks](https://docs.railway.app/deploy/healthchecks) for applications.
* Use [Custom Domains](https://docs.railway.app/deploy/exposing-your-app#custom-domains) for your application(s).
* Use [Config as Code](https://docs.railway.app/deploy/config-as-code) to configure services.