#!/bin/sh
if [ -z "${GA_TOKEN}" ]; then
  echo "Missing expected env variable."
  exit 1
fi
BUILD_HASH="$(git rev-parse --short HEAD)"
BUILD_DATE="$(date -I)"
echo $BUILD_HASH
echo $BUILD_DATE
echo "REACT_APP_GA_TOKEN=${GA_TOKEN}" > ./.env.production.local
echo "REACT_APP_BUILD_HASH=${BUILD_HASH}" >> ./.env.production.local
echo "REACT_APP_BUILD_DATE=${BUILD_DATE}" >> ./.env.production.local
