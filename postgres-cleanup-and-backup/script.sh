echo "Deactivating old links..."

psql -c "SELECT * FROM link WHERE create_ts < CURRENT_DATE - INTERVAL '7 days'"

echo "Starting backup..."

test -n "$RAILWAY_VOLUME_MOUNT_PATH" && pg_dump --compress 9 --file "$RAILWAY_VOLUME_MOUNT_PATH/$(date --utc).zip" || echo "The RAILWAY_VOLUME_MOUNT_PATH variable is missing. Make sure to attach a volume to this deployment."
