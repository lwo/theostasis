#!/bin/bash

read -r dummy repo dummy <<< $(git remote -v | grep origin)
tag=$(git describe --tags $(git rev-list --tags --max-count=1))
rev=$(git rev-parse "$tag")
echo '<!--' > views/_version.pug
echo "${repo} tag ${tag} rev ${rev}" >> views/_version.pug
echo '-->' >> views/_version.pug
sed "s/Version='latest'/Version='${tag}'/g" Dockerfile > Dockerfile.tmp
docker build --tag="theosis:${tag}" . --file=Dockerfile.tmp
docker build --tag="theosis:latest" . --file=Dockerfile.tmp
rm "Dockerfile.tmp"
