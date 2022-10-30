#!/bin/bash

for xml_file in svgs/*.svg
do
  filename=$(basename -- "$xml_file")
  filename="${filename%.*}"
  f="../views/svgs/${filename}.pug"
  echo "mixin svg-${filename}()" > "$f"
  /usr/bin/python2 xml_transformer/app.py --xml_file="$xml_file" --xsl_file=svg2pug.xsl > tmp
  sed '/^ *$/d' tmp >> "$f"
  rm tmp
done