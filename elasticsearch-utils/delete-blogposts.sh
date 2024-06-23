#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

# curl -X DELETE "$ES_URL/$INDEX_NAME/_doc/1"

curl -X POST "$ES_URL/$INDEX_NAME/_delete_by_query" \
 -H 'Content-Type: application/json' \
 -d'
{
    "query": {
        "match_all": {}
    }
}'
