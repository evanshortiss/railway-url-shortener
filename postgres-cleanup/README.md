# Railway Postgres Backup

Provides a container image that can be used to execute a query against a Postgres database.

## Run Locally

Use these commands from inside this directory to dump your Postgres running on
Railway to a local file `.sql` file:

```bash
railway run -s "Quarkus Backend" env | grep -E 'PG.*=' > .env

docker build . -t pg-query

docker run --rm --name pg-query --env-file .env pg-query
```

## Run on Railway as a Cron Job

TODO