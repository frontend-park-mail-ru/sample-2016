'use strict';

/**
* @see http://artsiom.mezin.eu/technofront/
*/
function onSubmit(form) {
	let data = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	let result = request('/users', data);

	if (result === '100') {
		form.hidden = true;
		window.helloWorld.innerHTML = hello(data.user);
	}

	console.log(data, result);
}

function hello(text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
}
