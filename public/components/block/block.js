(function () {
	'use strict';

	class Block {
		constructor(name, options = {}) {
			this._el = document.createElement(name);
			this.setAttrs(options.attrs);
			this._options = options;
			console.log(options);
			if (options.id) {
				this._el.id = options.id;
			}
		}

		setAttrs(attrs = {}) {
			Object.keys(attrs).forEach(name => {
				this._el.setAttribute(name, attrs[name]);
			});
		}

		renderTo(element) {
			element.appendChild(this._el);
		}

		append(element) {
			if (element instanceof Block) {
				this._el.appendChild(element._get());
			} else {
				this._el.appendChild(element);
			}
		}

		/**
		 * Подписка на событие
		 * @param {string} type - имя события
		 * @param {function} callback - коллбек
		 */
		on(type, callback) {
			this._el.addEventListener(type, callback);
		}

		/**
		 * Отписка от события
		 * @param {string} type - имя события
		 * @param {function} callback - коллбек
		 */
		stop(type, callback) {
			this._el.removeEventListener(type, callback);
		}

		toString() {
			return this._el.outerHTML;
		}

		_get() {
			return this._el;
		}
	}

	//   export
	window.Block = Block;
})();
