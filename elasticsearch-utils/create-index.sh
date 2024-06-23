#!/bin/bash

export ES_URL=localhost:9200
export INDEX_NAME=blog-index

curl -X DELETE "$ES_URL/$INDEX_NAME"

curl -XPUT "$ES_URL/$INDEX_NAME" \
 -H 'Content-Type: application/json' \
 -d'
{
  "settings": {
    "analysis": {
      "filter": {
        "ru_stop": {
          "type": "stop",
          "stopwords": "_russian_"
        },
        "ru_stemmer": {
          "type": "stemmer",
          "language": "russian"
        }
      },
      "analyzer": {
        "default": {
          "char_filter": [
            "html_strip"
          ],
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "ru_stop",
            "ru_stemmer"
          ]
        }
      }
    }
  },
  "mappings": {
      "properties": {
        "title": {
          "type": "text"
        },
        "content": {
          "type": "text"
        }
      }
  }
}'
