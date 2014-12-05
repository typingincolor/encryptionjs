# Encryption Module

An example module that can encrypt and decrypt a string using the RSA cypher.

## Usage

### Installation

Use npm to install the module by putting the below in your package.json file

```json
"dependencies": {
    "encryption": "git+ssh://git@github.com:typingincolor/encryptionjs.git"
}
```

### Configuration

Create a file called `encryption.js` in your project root. The format of the file is:

```json
{
  "public.key": "/path/to/public.key.pem",
  "private.key": "/path/to/private.key.pem"
}
```
### Generating Keys

Run the following commands:

```shell
openssl genrsa -out private.pem 1024
openssl rsa -in private.pem -out public.pem -outform PEM -pubout
```

### Running unit tests

`npm test`
