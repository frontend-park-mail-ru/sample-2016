(function () {
	//import
	const Model = window.Model;
	
	class Message extends Model {

		constructor(attributes) {
			super(attributes);
		}

		url(id) {
			if (id) {
				return `${this.baseUrl}/messages/${id}.json`;
			}
			return `${this.baseUrl}/messages.json`;
		}
		
		get defaults() {
			return {
				name: 'Default name',
				email: 'anon@mail.ru',
				timestamp: this.time
			}
		}
		
		get time() {
			return Date.now();
		}
	}
	
	//export
	window.Message = Message;
	
})();
