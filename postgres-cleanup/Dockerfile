FROM registry.hub.docker.com/library/postgres

# This will automatically dump the database targetted by
# the following (required!) environment variables:
# - PGDATABASE
# - PGHOST
# - PGPASSWORD
# - PGPORT
# - PGUSER

COPY script.sh script.sh
CMD ["sh", "script.sh"]
