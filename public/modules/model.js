(function () {
	
	class Model {
		
		constructor(attributes) {
			this.attributes = Object.assign({}, this.defaults, this._clean(attributes));
		}
		
		get baseUrl() {
			return 'https://technofront-f958d.firebaseio.com';
		}
		
		get defaults() {
			return {};
		}
		
		_clean(attributes) {
			Object.keys(attributes).forEach(key => {
				if (attributes[key] === undefined) {
					delete attributes[key];
				}
				
				if (typeof attributes[key] === 'object' && attributes[key] !== null) {
					this._clean(attributes[key]);
				}
			});
			
			return attributes;
		}
		
		fetch() {
			return this.send('GET', { id: this.attributes.id })
				.then(data => JSON.parse(data))
				.then(json => {
					this.attributes = json;
					return this.attributes;
				});
		}
		
		save() {
			const method = this.attributes.id ? 'PUT' : 'POST';

			return this.send(method, this.attributes)
				.then((data => JSON.parse(data)))
				.then(json => {
					this.attributes.id = json.name;
					return this.attributes;
				});
		}
		
		remove() {
			return this.send('DELETE', { id: this.attributes.id })
				.then(() => {
					this.attributes = {};
				});
		}

		send(method, data) {
			const url = this.url(data.id);
			
			return new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest();
				xhr.open(method, url, true);
				xhr.setRequestHeader('Content-type', 'application/json');
				
				xhr.onreadystatechange = function () {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200) {
							resolve(xhr.responseText);
						} else {
							reject();
						}
					}
				}
				
				xhr.send(JSON.stringify(data));
			});
		}
		
	}
	
	//export
	window.Model = Model;
	
})();
