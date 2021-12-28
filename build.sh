#!/bin/sh

version="0.5.1"

docker buildx create --name mbuilder
docker buildx build --push -t wi4er/doppelganger:$version --platform linux/arm64,linux/amd64 .
