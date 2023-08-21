echo "Deactivating old links...\n"

psql -c "UPDATE link SET active = false WHERE create_ts < CURRENT_DATE - INTERVAL '1 days';"

echo "\nFinished deactivating old links"