(function () {
	'use strict';
	
	// import
	let Button = window.Button;
	
	class Form {
		
		/**
		 * Конструктор класса Form
 		 */
		constructor (options = { data: {} }) {
			this.data = options.data;
			this.el = options.el;
			
			this.render();
		}

		render () { 
			this._updateHtml()
			this._installControls();
		}
		
		_getFields () {
			let { fields = [] } = this.data;
			
			return fields.map(field => { return `<input type="text" name="${field.name}">` }).join(' ')
		}
		
		_updateHtml () {
			this.el.innerHTML = `
				<form>
					<h1>${this.data.title}</h1>
					<div>
						${this._getFields()}
					</div>
					<div class="js-controls">
					</div>
				<form>
			`;
		}
		
		_installControls () {
			let { controls = [] } = this.data;
			
			controls.forEach(data => {
				let control = new Button({text: data.text}).render();
				this.el.querySelector('.js-controls').appendChild(control.el);
			});
		}
		
		on (type, callback) {
			this.el.addEventListener(type, callback);
		}
		
		//TODO вернуть данные формы
		getFormData () {
			let form = this.el.querySelector('form');
			let elements = form.elements;
			let fields = {};
			
			Object.keys(elements).forEach(element => {
				let name = elements[element].name;
				let value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

	}
	
	//export
	window.Form = Form;
})();
