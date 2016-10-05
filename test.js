let assert = require('assert');
let pathToRegex = require('./public/modules/pathToRegex');


//TODO: Кейсы для функции filter
// assert.equal(filter('КЕК'), '***');

let check1 = pathToRegex('/path1/users/:userid/books/:n');
let checkResult = [
	'/path1/users/1/books/12',
	'/path1/users/1214124/books/234215125',
	'/path1/users/id122123/books/leon',
	'/path1/users/0/books/0',
	'/path/users/0/books/0',
	'/ath1/usrs/0/books/0',
	'/path1/users/0/0/books/0',
	'/path1/users/0/books/',
	'/',
	'/path1',
].map(check1);

let expectedResult = [
	{userid: '1', n: '12'},
	{userid: '1214124', n: '234215125'},
	{userid: 'id122123', n: 'leon'},
	{userid: '0', n: '0'},
	null,
	null,
	null,
	null,
	null,
	null
];

assert.deepStrictEqual(checkResult, expectedResult, 'Функция pathToRegex не работает');
