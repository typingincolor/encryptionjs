var chai = require('chai');

var e = require('../lib/encrypt.js');
var encrypt = e.encrypt;
var decrypt = e.decrypt;
var expect = require('chai').expect;
var assert = require('chai').assert;

var public_key = 'spec/public.pem';
var private_key = 'spec/private.pem';

describe('Encryption', function() {
  it('should decrypt an encrypted string to what it started with', function(done) {
    e.setPublicKey(public_key);
    e.setPrivateKey(private_key);

    encrypt('4444333322221111').then(function(encrypted_txt) {
      return decrypt(encrypted_txt);
    }).then(function(decrypted_txt) {
      expect(decrypted_txt).to.equal('4444333322221111');
    }).done(done);
  });

  it('encryption should fail when a bad public key is passed in', function(done) {
    e.setPublicKey('rubbish');

    encrypt('4444333322221111').then(function(encrypted_txt) {
      assert.fail('should return an error');
    }, function(err) {
      expect(err).to.equal('Error opening Public Key rubbish');
    }).done(done);
  });

  it('decryption should fail when a bad private key is passed in', function(done) {
    e.setPublicKey(public_key);
    e.setPrivateKey('rubbish');

    encrypt('4444333322221111').then(function(encrypted_txt) {
      return decrypt(encrypted_txt);
    }).then(function() {
      assert.fail('should return an error');
    }, function(err) {
      expect(err).to.equal('Error opening Private Key rubbish');
    }).done(done);
  });
});
