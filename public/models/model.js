(function () {
	'use strict';
	
	class Model {
		
		constructor(attributes) {
			this.attributes = Object.assign({}, this.defaults, attributes);
		}
		
		get defaults() {
			return {};
		}
		
		get url() {
			return '/';
		}
		
		send(method, data = {}) {
			return new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest();
				xhr.open(method, url, true);

				xhr.onReadyStateChange = function () {
					if (xhr.readyState === 4) {
						resolve(xhr.responseText);
					}
				}
				
				xhr.onerroe = function () {
					reject();
				}
				
				xhr.send(JSON.stringify(data));
			});
		}
		
		save() {
			let method = this.attributes.id ? 'PUT' : 'POST';
			
			return this.send(method, this.attributes);
		}
		
	}
	
	// export
	window.Model = Model;
})();
