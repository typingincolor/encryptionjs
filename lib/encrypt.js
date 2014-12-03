var Q = require('q');
var exec = require('child_process').exec;
var fs = require('fs');
var nconf = require('nconf');

nconf.file({
  file: 'encryption.json'
});

exports.setPublicKey = function(public_key) {
  nconf.set('public.key', public_key);
};

exports.setPrivateKey = function(private_key) {
  nconf.set('private.key', private_key);
};

exports.encrypt = function(txt) {
  var deferred = Q.defer();
  var public_key = nconf.get('public.key');

  exec('echo "' + txt + '" | openssl rsautl -encrypt -inkey ' + public_key + ' -pubin | base64', function(err, stdout, stderr) {
    if (err || stderr) {
      deferred.reject(stderr.split('\n')[0]);
    } else {
      deferred.resolve(stdout);
    }
  });

  return deferred.promise;
};

exports.decrypt = function(txt) {
  var deferred = Q.defer();
  var private_key = nconf.get('private.key');

  exec('echo "' + txt + '" | base64 --decode | openssl rsautl -decrypt -inkey ' + private_key, function(err, stdout, stderr) {
    if (err) {
      deferred.reject(stderr.split('\n')[0]);
    } else {
      deferred.resolve(stdout.trim());
    }
  });

  return deferred.promise;
};
