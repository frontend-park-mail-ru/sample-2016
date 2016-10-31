(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;

	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-login');
			this.hide();

			// TODO: дописать реализацию

		}

		init(options = {}) {
			// TODO: дописать реализацию
		}
	}


	// export
	window.MainView = MainView;

})();
