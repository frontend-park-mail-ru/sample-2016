'use strict';

const socket = {
	clientRequest (url, data) {
		let xhr = new XMLHttpRequest();

		xhr.open('POST', url, false);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(data));

		return xhr.responseText;
	},
	publish (data = {}) {
		let body = Object.assign({
			time: Date.now()
		}, data);

		return new Promise((resolve, reject) => {
			require('request').post('https://technofront-f958d.firebaseio.com/messages.json',
			{
				form: JSON.stringify(body)
			},
			(err, httpResponse, body) => {
				if (err) {
					return reject(err);
				}

				resolve(body);
			});
		}).catch(err => console.log(err));
	}
};

if (typeof exports === 'object') {
	module.exports = socket;
}
