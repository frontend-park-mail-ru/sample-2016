'use strict';

let userData = {};

function onLogin (form, block) {
	userData = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	 jsLogin.hidden = true;
	 jsChat.hidden = false;

	 if (userData.user) {
		 jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
	 }
}

function onChat (form) {
	let data = {
		message: form.elements['message'].value
	};

	// let result = request('/users', data);

	console.log(data, result);
}

function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
}
