#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');

exec('echo \'4444333322221111\' | openssl rsautl -encrypt -inkey public.pem -pubin | base64', function(err, stdout, stderr) {
  console.info('encrypted string:', stdout)
  exec('echo "' + stdout +'" | base64 --decode | openssl rsautl -decrypt -inkey private.pem', function(err, stdout, stderr) {
    console.info('decrypted string:', stdout);
  });
});
