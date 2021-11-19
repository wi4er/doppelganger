#!/bin/sh

version="0.2.1"

docker buildx create --name mbuilder
docker buildx build --push -t wi4er/doppelganger:$version --platform linux/arm64,linux/amd64 .
