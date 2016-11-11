'use strict';

let makeUser = require('./make-user');

const users = [
	{
		username: 'Jhon Snow',
		email: 'never@winter.com'
	}, {
		username: 'anon',
		email: 'no@thing.com'
	}, {
		username: 'Cat-o-dog',
		email: 'cat@dog.ru'
	}, {
		username: 'frontend',
		email: 'kek@upachka.cha'
	}
];

const messages = [
	{
		message: 'Всем привет',
		email: 'never@winter.com'
	}, {
		message: 'Зима близко',
		email: 'never@winter.com'
	}, {
		message: 'Я тебя убью, Джон',
		email: 'no@thing.com'
	}, {
		message: 'И потом скачаю на флешку весь интернет',
		email: 'no@thing.com'
	}, {
		message: 'KEK KEK KEK LOLOLO PHSCH',
		email: 'kek@upachka.cha'
	}, {
		message: 'Берегитесь белых ходоков',
		email: 'never@winter.com'
	}, {
		message: 'Зима близко',
		email: 'never@winter.com'
	},
];


module.exports = function (usrs, msgs) {
	users.forEach(user => {
		let u = makeUser(user.username, user.email);
		usrs.set(u.secret, u);
		// console.dir(u.secret);
	});
	messages.forEach(m => msgs.push(m));
};
