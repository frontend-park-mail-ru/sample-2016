(function () {
	'use strict';

	// import
	// let Model = window.Model;

	class Message {
		constructor() {
			const protocol = window.location.protocol === 'https:' ?
				'wss:' : 'ws:';
			const address = `${protocol}/${window.__HOST}/ws/messages`;
			const echoAddress = `${protocol}/${window.__HOST}/ws/messages`;
			console.log(address);
			console.log(echoAddress);
		}

		sendMessage(message) {

		}

		addNewMessageListener(callback) {

		}

	}

	//export
	window.Message = Message;
})();
