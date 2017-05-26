# records
Site, schema, and utilities for records.treehub.com

## Running

1. `node scripts/prepare` -> Makes a copy of the database
1. `node scrapers/<scraper>` -> Scrapers can be run in parallel
1. `node scripts/diff` -> Compares the 2 databases and updates added/removed
1. `node scripts/report` -> Outputs the report for the given timeframe
