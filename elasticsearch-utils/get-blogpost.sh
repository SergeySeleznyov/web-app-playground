#!/bin/bash

export ES_URL=localhost:9200

curl -X GET "$ES_URL/blog-index/_doc/1"