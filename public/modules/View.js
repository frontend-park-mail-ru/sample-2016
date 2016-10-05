(function () {
	'use strict';

	class View {
		constructor(options = {}) {
			if (options.createElement) {
				this.tagName = options.tagName || 'div';
				this._el = document.createElement(this.tagName);
			}
		}

		init(options = {}) {
			this.setAttrs(options.attrs);
		}

		pause(options = {}) {
			this.hide();
		}

		resume(options = {}) {
			this.show();
		}

		show(options = {}) {
			this._el.hidden = false;
		}

		hide(options = {}) {
			this._el.hidden = true;
		}

		render(options = {}) {

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

		setAttrs(attrs = {}) {
			Object.keys(attrs).forEach(name => {
				this._el.setAttribute(name, attrs[name]);
			})
		}

		toString() {
			return this._el.outerHTML;
		}

		setRouter (router) {
			this.router = router;
		}

	}

	window.View = View;

})();
