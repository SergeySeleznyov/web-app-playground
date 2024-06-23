#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -XPOST "$ES_URL/$INDEX_NAME/_search/" \
 -u 'elastic:changeme' \
 -H 'Content-Type: application/json' \
 -d'
{
  "query": {
    "simple_query_string": {
      "query": "label"
    }
  },
  "highlight": {
    "fields": {
      "message": {}
    }
  }
}'
