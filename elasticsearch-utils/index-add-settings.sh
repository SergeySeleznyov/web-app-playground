#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -X PUT "$ES_URL/_settings" \
 -H 'Content-Type: application/json' \
 -d'
{
  "index" : {
    "highlight.max_analyzed_offset" : 3000000
  }
}'
