#!/bin/bash

f="Dockerfile.tmp"
tag=$(git describe --tags "$(git rev-list --tags --max-count=1)")
if [ -z "$tag" ]; then
  echo 'Must have a tag. Use git tag -a TAGNAME'
  exit 1
fi
rev=$(git rev-parse "$tag")
echo '//-' > views/version.pug
echo "  https://github.com/lwo/theostasis/releases/tag/${tag}" >> views/version.pug
echo "  https://github.com/lwo/theostasis/commit/${rev}" >> views/version.pug
sed "s/Version='latest'/Version='${tag}'/g" Dockerfile > "$f"
docker build --tag="theosis:${tag}" . --file="$f"
docker build --tag="theosis:latest" . --file="$f"
rm "$f"