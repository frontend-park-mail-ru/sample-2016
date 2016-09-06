let request = require('request');

module.exports = {
	publish (data = {}) {
		let body = Object.assign({
			time: Date.now()
		}, data);

		return new Promise((resolve, reject) => {
			request.post('https://technofront-f958d.firebaseio.com/messages.json',
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
