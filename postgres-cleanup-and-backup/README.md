# Railway Postgres Backup

Provides a container image that can be used to backup a Postgres database.

## Run Locally

Use these commands from inside this directory to dump your Postgres running on
Railway to a local file `.sql` file:

```bash
railway run -s "Quarkus Backend" env | grep -E 'PG.*=' > .env

docker run --rm --name pg-backup --env-file .env \
registry.hub.docker.com/library/postgres \
pg_dump > data/$(date).sql
```

## Run on Railway as a Cron Job
