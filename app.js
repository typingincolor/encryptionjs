#!/usr/bin/env node

var Q = require('q');
var exec = require('child_process').exec;
var fs = require('fs');

var encrypt = function (txt) {
  var deferred = Q.defer();

  exec('echo "' + txt + '" | openssl rsautl -encrypt -inkey public.pem -pubin | base64', function (err, stdout, stderr) {
    if (err) {
      deferred.reject(stderr);
    } else {
      deferred.resolve(stdout);
    }
  });

  return deferred.promise;
};

var decrypt = function (txt) {
  var deferred = Q.defer();

  exec('echo "' + txt + '" | base64 --decode | openssl rsautl -decrypt -inkey private.pem', function (err, stdout, stderr) {
    if (err) {
      deferred.reject(stderr);
    } else {
      deferred.resolve(stdout);
    }
  });

  return deferred.promise;
};

encrypt('4444333322221111').then(function (encrypted_txt) {
  return decrypt(encrypted_txt);
}).then(function (decrypted_txt) {
  console.info(decrypted_txt);
});
