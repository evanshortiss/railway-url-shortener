# Redirect Service

This service accepts requests in the form `GET /:shortId`, and redirects
them to a URL provided by the Quarkus shortener API. The `shortId` from the
incoming request is used to perform a lookup against the Quarkus shortener API
to find the original URL.

## Configuration

The following environment variables can be configured:

* API_URL: The shortener API. Defaults to http://localhost:8181 during local development.
* LINK_INFO_TIMEOUT: How long to wait for a response from `API_URL` before timing out.
* HOST: Defaults to `0.0.0.0`.
* PORT: Defaults to `8080`.
* NODE_ENV: Defaults to `production`.
* MORGAN_FORMAT: Controls inbound HTTP request logging. Defaults to `tiny`.

## Local Development

This will install dependencies and start a hot reload server:

```
npm ci
npm run dev
```