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
# CMD ["/bin/sh", "-c", "test -n \"$RAILWAY_VOLUME_MOUNT_PATH\" && pg_dump --compress 9 --file \"$RAILWAY_VOLUME_MOUNT_PATH/$(date --utc).zip\" || echo \"The RAILWAY_VOLUME_MOUNT_PATH variable is missing. Make sure to attach a volume to this deployment.\""] 