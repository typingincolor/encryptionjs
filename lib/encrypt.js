var Q = require('q');
var exec = require('child_process').exec;
var fs = require('fs');

exports.encrypt = function(txt) {
  var deferred = Q.defer();
  exec('echo "' + txt + '" | openssl rsautl -encrypt -inkey public.pem -pubin | base64', function(err, stdout, stderr) {
    if (err || stderr) {
      deferred.reject(stderr);
    } else {
      deferred.resolve(stdout);
    }
  });

  return deferred.promise;
};

exports.decrypt = function(txt) {
  var deferred = Q.defer();
  exec('echo "' + txt + '" | base64 --decode | openssl rsautl -decrypt -inkey private.pem', function(err, stdout, stderr) {
    if (err) {
      deferred.reject(stderr);
    } else {
      deferred.resolve(stdout.trim());
    }
  });

  return deferred.promise;
};
