#!/bin/bash

npm install -g google-fonts-offline ttf2eot ttf2svg

goofoffline outDir=src/assets/fonts/ "http://fonts.googleapis.com/css?family=Play:400,700"
ttf2eot src/assets/fonts/Play_400_normal.ttf src/assets/fonts/Play_400_normal.eot
ttf2eot src/assets/fonts/Play_700_normal.ttf src/assets/fonts/Play_700_normal.eot
ttf2svg src/assets/fonts/Play_700_normal.ttf ./src/assets/fonts/Play_700_normal.svg
mv Play_700_normal.svg src/assets/fonts/

goofoffline outDir=src/assets/fonts/ "http://fonts.googleapis.com/css?family=Share+Tech+Mono"
ttf2eot src/assets/fonts/Share+Tech+Mono_400_normal.ttf src/assets/fonts/Share+Tech+Mono_400_normal.eot

