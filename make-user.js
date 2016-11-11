'use strict';

const createHash = require('crypto').createHash;


module.exports = function (username, email) {
	const user = {
		username,
		email
	};
	const hash = createHash('sha256');
	hash.update(JSON.stringify(user));
	user.secret = hash.digest('hex');

	return user;
};
