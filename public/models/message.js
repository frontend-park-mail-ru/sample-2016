(function () {
	'use strict';

	// import
	// let Model = window.Model;

	class Message {
		constructor(cb) {
			const protocol = window.location.protocol === 'https:' ?
				'wss:' : 'ws:';
			const address = `${protocol}//${window.__WSHOST}/ws/messages`;
			this.addNewMessageListener(cb);
			this.ws = new WebSocket(address);

			this.ws.onopen = function () {

				this.ws.onmessage = function ({data}) {
					const messages = JSON.parse(data);
					if (this.callback) {
						this.callback(messages);
					}
				}.bind(this);


				setInterval(() => {
					console.info('refresh ws');
					this.ws.send('');
				}, 10000);


			}.bind(this);
		}

		sendMessage(message) {
			this.ws.send(JSON.stringify({
				text: message
			}));
		}

		addNewMessageListener(callback) {
			this.callback = callback;
		}
	}

	//export
	window.Message = Message;
})();
