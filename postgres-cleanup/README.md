# Railway Postgres Backup

Provides a container image that can be used to execute a query against a Postgres database. Specifically, this container image will expire old shortlinks.

## Run Locally

Use these commands from inside this directory to dump your Postgres running on
Railway to a local file `.sql` file:

```bash
# Replace "Quarkus Backend" with the nane of any service that has the
# Postgres variable references associated with it on Railway
railway run -s "Quarkus Backend" env | grep -E 'PG.*=' > .env

docker build . -t pg-cleanup

docker run --rm --name pg-cleanup --env-file .env pg-cleanup
```
