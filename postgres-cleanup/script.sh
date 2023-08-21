echo "Deactivating old links"

QUERY="UPDATE link SET active = false WHERE create_ts < CURRENT_TIMESTAMP - INTERVAL '$LINK_TTL_HOURS hours';"
echo "Query: \"$QUERY\""

psql -c "$QUERY"

echo "\nFinished deactivating old links"