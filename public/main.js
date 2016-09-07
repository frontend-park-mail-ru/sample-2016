'use strict';

let userData = {
	email: 'iketari@gmail.com'
};

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

	 subscribe();
}

function createMessage (text, isMy = false) {
	let div = document.createElement('div');
	div.classList.add('chat__message');

	if (isMy) {
		div.classList.add('chat__message_my');
	}
	div.innerHTML = text;

	return div;
}

function onChat (form) {
	let data = {
		message: form.elements['message'].value,
		email: userData.email
	};

	let result = technolibs.request('/messages', data);
	form.reset();
}

function renderChat (items) {
	jsMessages.innerHTML = '';
	items.forEach(item => {
		let message = createMessage(item.message, item.email === userData.email);
		jsMessages.appendChild(message);
	});
	jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
	technolibs.onMessage(data => {
		renderChat(Object.keys(data).map(key => data[key]));
	});
}

function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
}
