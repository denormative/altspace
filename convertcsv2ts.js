#!/usr/bin/env node

const Papa = require('papaparse');
const glob = require("glob")
const fs = require('fs');

const ppConfig = {
  dynamicTyping: true,
  header: true,
  skipEmptyLines: true
}

const globOptions = {}

glob("src/**/*.csv", globOptions, function (er, files) {
  console.log(JSON.stringify(files))
  for (let i=0; i<files.length; i++) {
    var data = fs.readFileSync(files[i], 'utf8');
    const csv = Papa.parse(data, ppConfig);
    console.log(JSON.stringify(csv))
  }
})
