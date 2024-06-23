#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -X GET "$ES_URL/$INDEX_NAME/_settings?pretty"
