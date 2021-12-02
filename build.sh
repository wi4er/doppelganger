#!/bin/sh

version="0.4.0"

docker buildx create --name mbuilder
docker buildx build --push -t wi4er/doppelganger:$version --platform linux/arm64,linux/amd64 .
