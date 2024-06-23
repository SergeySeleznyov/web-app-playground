#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -X POST "$ES_URL/$INDEX_NAME/_doc/1?refresh=true" \
 -H 'Content-Type: application/json' \
 -d'
{
  "title": "title 1",
  "content": "content 1"
}'


curl -X POST "$ES_URL/$INDEX_NAME/_doc/2?refresh=true" \
 -H 'Content-Type: application/json' \
 -d'
{
  "title": "title 2",
  "content": "content 2"
}'
