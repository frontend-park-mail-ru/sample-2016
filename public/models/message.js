(function () {
	'use strict';
	
	//import
	let Model = window.Model;
	
	class Message extends Model {
		
		constructor(attributes) {
			super(attributes);
		}
		
		get defaults() {
			return {
				name: 'Anon',
				email: 'anon@mail.ru'
			}
		}
		
		get url() {
			return '/api/messages/';
		}
		
	}
	
	//export
	window.Message = Message;
})();
