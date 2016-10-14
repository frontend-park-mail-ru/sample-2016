(function () {
	'use strict';
	
	class Model {
		
		constructor(attributes = {}) {
			Object.keys(attributes).forEach(key => {
				if (attributes[key] === undefined) {
					delete attributes[key];
				}
			})
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
				xhr.open(method, this.url, true);
				xhr.setRequestHeader('Content-Type', 'application/json');

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						resolve(xhr.responseText);
					}
				}
				
				xhr.onerror = function () {
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
