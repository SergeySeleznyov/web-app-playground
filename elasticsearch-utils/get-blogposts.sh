#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -XPOST "$ES_URL/$INDEX_NAME/_search/" \
 -H 'Content-Type: application/json' \
 -d'
{
    "query": {
        "match_all": {}
    }
}'
