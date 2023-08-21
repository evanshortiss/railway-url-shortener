FROM registry.hub.docker.com/library/postgres

# Default link TTL
ENV LINK_TTL_HOURS 24

# This will automatically dump the database targetted by
# the following (required!) environment variables:
# - PGDATABASE
# - PGHOST
# - PGPASSWORD
# - PGPORT
# - PGUSER

COPY script.sh script.sh
CMD ["sh", "script.sh"]
