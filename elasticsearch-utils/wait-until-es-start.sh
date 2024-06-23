#!/bin/bash

export ES_URL=localhost:9200

while [[ $(curl -X GET $ES_URL 2>/dev/null | grep elasticsearch | wc -l) -ne 1 ]]; do
    sleep 5
    echo 'Wait for Elastic Search server response ...'
done

echo 'Elastic Search server has successfully started.'
