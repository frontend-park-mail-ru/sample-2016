(function () {
	'use strict';
	
	// import
	let Button = window.Button;
	
	class Form {
		
		/**
		 * Конструктор класса Form
 		 */
		constructor (options = { data: {} }) {
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this.el = options.el;

			this.render();
		}

		render () { 
			this._updateHtml()
			this._installControls();
		}
		
		/**
		 * Обновить html компонента
		 */
		_updateHtml () {
			this.el.innerHTML = this.template(this.data);
		}
		
		/**
		 * Вставить управляющие элементы в форму
		 */
		_installControls () {
			let { controls = [] } = this.data;
			
			controls.forEach(data => {
				let control = new Button({text: data.text}).render();
				this.el.querySelector('.js-controls').appendChild(control.el);
			});
		}
		
		/**
		 * Подписка на событие
		 * @param {string} type - имя события
		 * @param {function} callback - коллбек
		 */
		on (type, callback) {
			this.el.addEventListener(type, callback);
		}
		
		/**
		 * Взять данные формы
		 * @return {object}
		 */
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
