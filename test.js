let assert = require('assert');
let hello = require('./public/main').hello

assert.equal(hello('Test'), 'Привет, Test');
