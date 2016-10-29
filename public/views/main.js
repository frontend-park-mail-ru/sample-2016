'use strict';

import View from '../modules/view';
import Form from '../components/form/form';

export default class MainView extends View {
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
