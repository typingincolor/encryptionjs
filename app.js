#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

exec('echo \'4444333322221111\' | openssl rsautl -encrypt -inkey public.pem -pubin -out safe.txt', function(err, stdout, stderr) {
  exec('openssl rsautl -decrypt -inkey private.pem -in safe.txt', function(err, x, stderr) {
    console.info(x);
  });
});
