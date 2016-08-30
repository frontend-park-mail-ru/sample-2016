let hello = require('./public/main');
let assert = require('assert');

assert.equal(hello('Test'), 'Привет, Test');
