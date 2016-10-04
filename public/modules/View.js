(function () {
	'use strict';

	class View {
		constructor(options) {
			this.tagName = options.tagName || 'div';
			this._el = document.createElement();
		}

		show() {
			this._el.hidden = false;
		}

		hide() {
			this._el.hidden = true;
		}

		render() {

		}

		appendTo(el) {
			el.appendChild(this._el);
		}

		remove() {
			this._el && this._el.remove();
		}

		setElement(el) {
			this._el && this._el.remove();
			this._el = el;
		}

		setAttrs(attrs) {
			Object.keys(attrs).forEach(name => {
				this._el.setAttribute(name, attrs[name]);
			})
		}

		toString() {
			return this._el.outerHTML;
		}

	}

	window.View = View;

})();
