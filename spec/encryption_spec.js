var chai = require('chai');
var encrypt = require('../lib/encrypt.js').encrypt;
var decrypt = require('../lib/encrypt.js').decrypt;
var expect = require('chai').expect;

describe('Encryption', function() {
  it('should decrypt an encrypted string to what it started with', function(done) {
    encrypt('4444333322221111').then(function(encrypted_txt) {
      return decrypt(encrypted_txt);
    }).then(function(decrypted_txt) {
      expect(decrypted_txt).to.equal('4444333322221111');
    }).done(done);
  });
});
